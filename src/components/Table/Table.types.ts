import { TForexRates } from '../../services/fixer';

type TKeys = 'date' | 'currency' | 'rate';

type TProps = {
  data: TForexRates;
  itemsPerPage?: number;
};

export type { TKeys, TProps };
