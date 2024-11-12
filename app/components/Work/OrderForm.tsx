import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, CreditCard, Coins, DollarSign, Send } from 'lucide-react';

interface OrderFormProps {
    transactionType: 'Buy' | 'Sell';
    onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ transactionType, onClose }) => {
    const [crypto, setCrypto] = useState('USDT');
    const [currency, setCurrency] = useState('TRY');
    const [amount, setAmount] = useState('');
    const [wallet, setWallet] = useState('');
    const [totalReceived, setTotalReceived] = useState<number | null>(null);
    const [totalCryptoReceived, setTotalCryptoReceived] = useState<number | null>(null);
    const [unitPrice, setUnitPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

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
        if (!isNaN(numericAmount) && wallet && currency && crypto && unitPrice) {
            let usdAmount: number;
            if (currency === 'TRY') {
                const exchangeRateBuy = 34.4
                usdAmount = numericAmount / exchangeRateBuy;
            } else if (currency === 'USD') {
                usdAmount = numericAmount;
            } else {
                return;
            }

            if (currency === 'USD' && numericAmount < 9) {
                setError('Amount must be greater than $9.');
                setTotalReceived(null);
                setTotalCryptoReceived(null);
                return;
            } else if (currency === 'TRY' && numericAmount < 400) {
                setError('Amount must be greater than 400 TRY.');
                setTotalReceived(null);
                setTotalCryptoReceived(null);
                return;
            } else {
                setError(null);
            }

            let fee = usdAmount < 100 ? 3 : usdAmount * 0.03;
            let amountAfterFee = usdAmount - fee;
            const cryptoReceived = amountAfterFee / unitPrice;
            setTotalCryptoReceived(cryptoReceived);
            setTotalReceived(amountAfterFee);
        } else {
            setTotalReceived(null);
            setTotalCryptoReceived(null);
        }
    }, [transactionType, amount, currency, wallet, crypto, unitPrice]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!error) {
            const message = `*Order Details:*\nTransaction: ${transactionType}\nCryptocurrency: ${crypto}\nAmount: ${amount} ${currency}\nAfter fee deduction in USD: ${totalReceived?.toFixed(2)} USD\nWallet: ${wallet}\nTotal Crypto to be Received: ${totalCryptoReceived?.toFixed(7)} ${crypto}`;
            const whatsappUrl = `https://wa.me/+905488658336?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-r from-[#2D6ADE] to-[#BD24DF] shadow-2xl rounded-xl text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
                {transactionType} Cryptocurrency
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative">
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                        <Coins className="w-4 h-4 mr-2" />
                        Cryptocurrency
                    </label>
                    <select 
                        value={crypto} 
                        onChange={(e) => setCrypto(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0D0C29] border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    >
                        <option value="USDT">USDT(TRC-20)</option>
                        <option value="LTC">LTC</option>
                        <option value="ETH">ETH</option>
                        <option value="BTC">BTC</option>
                    </select>
                </div>

                <div className="relative">
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Currency
                    </label>
                    <select 
                        value={currency} 
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0D0C29] border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    >
                        <option value="TRY">TRY</option>
                        <option value="USD">USD</option>
                    </select>
                </div>

                <div className="relative">
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Amount
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-4 py-3 bg-[#0D0C29] border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    />
                </div>

                <div className="relative">
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                        <Wallet className="w-4 h-4 mr-2" />
                        Wallet
                    </label>
                    <select 
                        value={wallet} 
                        onChange={(e) => setWallet(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0D0C29] border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                    >
                        <option value="" disabled>Select Wallet</option>
                        <option value="Bybit">Bybit</option>
                        <option value="Binance">Binance</option>
                        <option value="Kucoin">Kucoin</option>
                        <option value="Okx">Okx</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
            </div>

            {error && (
                <div className="mt-6 p-3 bg-red-500/20 border border-red-400 rounded-lg text-red-200 text-sm">
                    {error}
                </div>
            )}

            {totalReceived !== null && totalCryptoReceived !== null && (
                <div className="mt-6 p-4 bg-[#0D0C29] border border-white/20 rounded-lg">
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

            <div className="mt-6 space-y-3">
                <button 
                    type="submit" 
                    className="flex items-center justify-center w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                    <Send className="w-5 h-5 mr-2" />
                    Send Order
                </button>
                
                <button 
                    type="button" 
                    onClick={onClose}
                    className="w-full px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default OrderForm;