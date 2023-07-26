import React from 'react';
import { TForexRatesResponse } from '../../services/fixer';

const Table = (data: TForexRatesResponse) => {
  const base: string = 'pt-BR';

  const transformRateToBase = (rate: number) => rate.toLocaleString(base, { maximumSignificantDigits: 3 });

  const transformDateToBase = (date: string) => new Date(date).toLocaleDateString(base);

  return (
    <table>
      <thead>
        <tr>
          <th id="symbols">Moeda</th>
          <th id="rates">Valor (em BRL)</th>
          <th id="time">Horário</th>
        </tr>
      </thead>
      {Object.entries(data?.rates || [])?.map(([symbol, rate], index) => (
        <tbody key={index}>
          <tr>
            <td>{symbol}</td>
            <td>{transformRateToBase(rate)}</td>
            <td>{transformDateToBase(data?.date as string)}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default Table;
