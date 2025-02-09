import * as cheerio from "cheerio";
const axios = require("axios");

interface ExchangeRate {
	currency: string;
	buying: number;
	selling: number;
}

type RateType = 'buying' | 'selling';

async function scrapeSite(): Promise<ExchangeRate[]>{
	const url = "https://api.allorigins.win/raw?url=" + encodeURIComponent("http://93.182.78.96/kozan/");
	const { data } = await axios.get(url, {
        maxRedirects: 5
    });
	const $ = cheerio.load(data);

	const targetTable = $('table.Table[style*="margin-top:20px"][style*="margin-left:50px"][style*="float:left"]');
	const rates: ExchangeRate[] = [];

	targetTable.find('tr').each((index, element) => {
		if ($(element).find('td.CurrencyName span').length === 0) return;
		if ($(element).find('td.CurrencyValue').length === 0) return;

		const currency = $(element).find('td.CurrencyName span').text().trim();
		const buyingRate = parseFloat($(element).find('td.CurrencyValue span').first().text().trim());
		const sellingRate = parseFloat($(element).find('td.CurrencyValue span').last().text().trim());

		if (currency && !isNaN(buyingRate) && !isNaN(sellingRate)) {
			rates.push({
			  currency,
			  buying: buyingRate,
			  selling: sellingRate,
			});
		  }
	})
	return rates;
}


function convertCurrency(rates: ExchangeRate[],amount: number, fromCurrency: string, toCurrency: string = 'USD', rateType: RateType = 'selling') {
    try {
        if (fromCurrency === 'GBP') { fromCurrency = 'STG';}
        if (fromCurrency === 'TRY') {
            const usdRate = rates.find(rate => rate.currency === 'USD');
            if (!usdRate) {
                throw new Error('USD rate not found');
            }
            return amount / usdRate.selling;
        }

        const fromRate = rates.find(rate => rate.currency === fromCurrency);
        if (!fromRate) throw new Error(`Rate for ${fromCurrency} not found`);
        
        const usdRate = rates.find(rate => rate.currency === 'USD');
        if (!usdRate) throw new Error('USD rate not found');
        
        const amountInTRY = amount * fromRate.buying;
        
        const finalAmount = amountInTRY / usdRate.selling;

        return finalAmount;

    } catch(error) {
        console.error('Error converting currency:', error);
        throw error;
    }
}


// const rates = [
//     { currency: 'STG', buying: 44.5, selling: 44.85 },
//     { currency: 'USD', buying: 35.8, selling: 36.1 },
//     { currency: 'EURO', buying: 37.05, selling: 37.4 }
//   ];

// console.log(convertCurrency(rates, 1000, 'TRY', 'USD', 'selling'))


export  {convertCurrency, scrapeSite };