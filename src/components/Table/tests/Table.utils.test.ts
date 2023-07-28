import { transformRateToLocale, transformDateToLocale } from '../Table.utils';

describe('Table.utils', () => {
  describe('transformRateToLocale', () => {
    it('should transform to BRL currency', () => {
      const value = transformRateToLocale(10);

      expect(value).toBe('R$ 10,00');
    });
  });

  describe('transformDateToLocale', () => {
    it('should transform date to BRL locale', () => {
      const date = transformDateToLocale('2023-07-13');

      expect(date).toBe('13/07/2023');
    });
  });
});
