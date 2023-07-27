const locale = 'pt-BR';

const transformRateToLocale = (rate: number) => rate.toLocaleString(locale, { style: 'currency', currency: 'BRL' });

const transformDateToLocale = (date: string) => new Date(date).toLocaleDateString(locale);

export { transformRateToLocale, transformDateToLocale };
