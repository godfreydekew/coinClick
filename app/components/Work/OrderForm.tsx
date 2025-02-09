import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, CreditCard, Coins, DollarSign, Send } from 'lucide-react';
import { convertCurrency, scrapeSite } from './sraper';

interface OrderFormProps {
    transactionType: 'Buy' | 'Sell';
    onClose: () => void;
}

interface ExchangeRate {
    currency: string;
    buying: number;
    selling: number;
}

const OrderForm: React.FC<OrderFormProps> = ({ transactionType, onClose }) => {
    const [crypto, setCrypto] = useState('USDT');
    const [currency, setCurrency] = useState('TRY');
    const [amount, setAmount] = useState('');
    const [totalReceived, setTotalReceived] = useState<number | null>(null);
    const [totalCryptoReceived, setTotalCryptoReceived] = useState<number | null>(null);
    const [unitPrice, setUnitPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

    // Keep all existing useEffect hooks and functions...
    useEffect(() => {
        const fetchRates = async () => {
            const rates = await scrapeSite();
            setExchangeRates(rates);
        };
        fetchRates();
    }, []);

    useEffect(() => {
        const fetchCryptoPrice = async () => {
            if (crypto !== 'USDT') {
                try {
                    const response = await axios.get(`https://api.coinbase.com/v2/prices/${crypto}-USD/spot`);
                    const price = response.data.data.amount;
                    setUnitPrice(parseFloat(price));
                } catch (error) {
                    console.error('Error fetching crypto price:', error);
                }
            } else {
                setUnitPrice(1);
            }
        };

        fetchCryptoPrice();
    }, [crypto]);

    useEffect(() => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && currency && crypto && unitPrice) {
            let usdAmount: number;
            if (currency === 'USD') {
                usdAmount = numericAmount;
            } else if (exchangeRates.length > 0) {
                usdAmount = convertCurrency(exchangeRates, numericAmount, currency, "USD", "selling");
            } else {
                return;
            }

            if (currency !== 'TRY' && numericAmount < 6) {
                setError('Amount must be greater than 6.');
                setTotalReceived(null);
                setTotalCryptoReceived(null);
                return;
            } else if (currency === 'TRY' && numericAmount < 240) {
                setError('Amount must be greater than 240 TRY.');
                setTotalReceived(null);
                setTotalCryptoReceived(null);
                return;
            } else {
                setError(null);
            }

            let fee = usdAmount < 100 ? 3 : usdAmount * 0.04;
            let amountAfterFee = usdAmount - fee;
            const cryptoReceived = amountAfterFee / unitPrice;
            setTotalCryptoReceived(cryptoReceived);
            setTotalReceived(amountAfterFee);
        } else {
            setTotalReceived(null);
            setTotalCryptoReceived(null);
        }
    }, [transactionType, amount, currency, crypto, unitPrice]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!error) {
            const message = `*Order Details:*\nTransaction: ${transactionType}\nCryptocurrency: ${crypto}\nAmount: ${amount} ${currency}\nAfter fee deduction in USD: ${totalReceived?.toFixed(2)} USD\nTotal Crypto to be Received: ${totalCryptoReceived?.toFixed(7)} ${crypto}`;
            const whatsappUrl = `https://wa.me/+905488658336?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4 sm:p-6 bg-gradient-to-r from-[#2D6ADE] to-[#BD24DF] shadow-2xl rounded-xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-white">
                {transactionType} Cryptocurrency
            </h2>

            <div className="space-y-4">
                <div className="relative">
                    <label className="flex items-center text-white text-sm font-medium mb-1">
                        <Coins className="w-4 h-4 mr-2" />
                        Cryptocurrency
                    </label>
                    <select 
                        value={crypto} 
                        onChange={(e) => setCrypto(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0D0C29] border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    >
                        <option value="USDT">USDT(TRC-20)</option>
                        <option value="LTC">LTC</option>
                        <option value="TRX">TRX</option>
                    </select>
                </div>

                <div className="relative">
                    <label className="flex items-center text-white text-sm font-medium mb-1">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Amount
                    </label>
                    <div className="flex">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="flex-1 px-3 py-2 bg-[#0D0C29] border border-r-0 border-white/20 rounded-l-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        />
                        <select 
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-20 px-2 py-2 bg-[#0D0C29] border border-l-0 border-white/20 rounded-r-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        >
                            <option value="TRY">TRY</option>
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="EURO">EUR</option>
                        </select>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-4 p-2 bg-red-500/20 border border-red-400 rounded-lg text-red-200 text-sm">
                    {error}
                </div>
            )}

            {totalReceived !== null && totalCryptoReceived !== null && (
                <div className="mt-4 p-3 bg-[#0D0C29] border border-white/20 rounded-lg">
                    <p className="text-white text-sm font-medium">
                        Total Crypto to be Received: 
                        <span className="block mt-1 text-lg font-bold text-green-400">
                            {totalCryptoReceived.toFixed(7)} {crypto}
                        </span>
                        <span className="block mt-1 text-xs opacity-75">
                            ({totalReceived.toFixed(2)} USD)
                        </span>
                    </p>
                </div>
            )}

            <div className="mt-4 space-y-2">
                <button 
                    type="submit" 
                    className="flex items-center justify-center w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                    <Send className="w-4 h-4 mr-2" />
                    Send Order
                </button>
                
                <button 
                    type="button" 
                    onClick={onClose}
                    className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default OrderForm;