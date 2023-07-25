import { TForexRatesResponse } from './fixer.types';
import { SUCCESS_RESPONSE_MOCK } from './fixer.mock';

const API_URL: string = `http://data.fixer.io/api/latest?access_key=${import.meta.env.VITE_FIXER_API_KEY}`;

const transformForexRatesResponse = (data: TForexRatesResponse) => {
  if (!data.rates) return undefined;

  const BRLbase = 1 / data?.rates?.BRL;

  const convertedRatesToBRL = Object.entries(data?.rates).reduce(
    (prev, [currency, exchange]) => ({ ...prev, [currency]: 1 / (exchange * BRLbase) }),
    {},
  );

  return { ...data, base: 'BRL', rates: convertedRatesToBRL };
};

const getForexRates = async () => {
  try {
    // const response = await fetch(API_URL);
    // const forexRates = await response.json() as TForexRatesResponse;
    // if (!forexRates.success) return undefined;
    return transformForexRatesResponse(SUCCESS_RESPONSE_MOCK);
  } catch (error) {
    console.error(error);
  }
};

export { API_URL, getForexRates };
