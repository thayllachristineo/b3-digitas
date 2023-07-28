import { TForexRatesResponse } from './fixer.types';

const API_URL: string = `http://data.fixer.io/api/latest?access_key=${process.env.VITE_FIXER_API_KEY}`;

const transformForexRatesResponse = (data: TForexRatesResponse) => {
  if (!data.rates) return [];

  const BRLbase = 1 / data?.rates?.BRL;

  return Object.entries(data?.rates).map(([currency, rate]) => ({
    date: data.date || '',
    currency: currency,
    rate: 1 / (rate * BRLbase),
  }));
};

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

const getForexRates = async () => {
  try {
    const response = await fetch(API_URL);
    const forexRates = (await response.json()) as TForexRatesResponse;
    if (!forexRates.success) return [];
    return transformForexRatesResponse(forexRates);
  } catch (error) {
    console.error(errorMessage(error));
    return [];
  }
};

export { API_URL, getForexRates };
