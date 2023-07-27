type TForexRatesResponse = {
  base?: string;
  date: string;
  rates?: Record<string, number>;
  success: boolean;
  timestamp?: number;
};

type TForexRates = Array<{
  date: string;
  currency: string;
  rate: number;
}>;

export type { TForexRatesResponse, TForexRates };
