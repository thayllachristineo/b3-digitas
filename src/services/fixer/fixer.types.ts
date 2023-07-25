type TForexRatesResponse = {
  base?: string;
  date?: string;
  rates?: Record<string, number>;
  success: boolean;
  timestamp?: number;
};

export type { TForexRatesResponse };
