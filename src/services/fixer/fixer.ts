import { TForexRatesResponse } from './fixer.types';
import { SUCCESS_RESPONSE_MOCK } from './fixer.mock';

const API_URL: string = `http://data.fixer.io/api/latest?access_key=${import.meta.env.VITE_FIXER_API_KEY}`;

const transformForexRatesResponse = (data: TForexRatesResponse) => {
  if (!data.rates) return [];

  const BRLbase = 1 / data?.rates?.BRL;

  return Object.entries(data?.rates).map(([currency, rate]) => ({
    date: data.date || '',
    currency: currency,
    rate: 1 / (rate * BRLbase),
  }));
};

const getForexRates = async () => {
  try {
    // const response = await fetch(API_URL);
    // const forexRates = (await response.json()) as TForexRatesResponse;
    // if (!forexRates.success) return undefined;
    // return transformForexRatesResponse(forexRates);
    return transformForexRatesResponse(SUCCESS_RESPONSE_MOCK);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { API_URL, getForexRates };
