import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Para ter acesso aos matchers de jest-dom

import Table from '../Table';

import { SUCCESS_TRANSFORMED_RESPONSE_MOCK } from '../../../services/fixer/fixer.mock';

const dataMock = SUCCESS_TRANSFORMED_RESPONSE_MOCK;

const defaultProps = {
  data: dataMock.slice(0, 10),
};

const setup = (props = defaultProps) => render(<Table {...props} />);

const getRowsData = (cells: HTMLElement[]) => {
  const rowsData: string[][] = [];
  let currentRowData: string[] = [];
  cells.forEach((cell, index) => {
    const columnIndex = index % 3;

    if (columnIndex === 0) {
      currentRowData = [cell.textContent || ''];
    } else {
      currentRowData.push(cell.textContent || '');
    }

    if (columnIndex === 2) {
      rowsData.push(currentRowData);
    }
  });
  return rowsData;
};

describe('components/Table', () => {
  describe('sort', () => {
    describe('currency', () => {
      it('should order currency desc', () => {
        setup({ data: dataMock.slice(0, 5) });

        const descOrder = [
          ['ANG', 'R$ 2,65', '23/07/2023'],
          ['AMD', 'R$ 0,01', '23/07/2023'],
          ['ALL', 'R$ 0,06', '23/07/2023'],
          ['AFN', 'R$ 0,06', '23/07/2023'],
          ['AED', 'R$ 1,30', '23/07/2023'],
        ];

        const orderCurrency = screen.getByText('Moeda');

        fireEvent.click(orderCurrency);
        fireEvent.click(orderCurrency);

        const allCells = screen.getAllByRole('cell');
        const rowsData = getRowsData(allCells);

        expect(rowsData).toEqual(descOrder);
      });

      it('should order currency asc', () => {
        setup({ data: dataMock.slice(0, 5) });

        const ascOrder = [
          ['AED', 'R$ 1,30', '23/07/2023'],
          ['AFN', 'R$ 0,06', '23/07/2023'],
          ['ALL', 'R$ 0,06', '23/07/2023'],
          ['AMD', 'R$ 0,01', '23/07/2023'],
          ['ANG', 'R$ 2,65', '23/07/2023'],
        ];

        const orderCurrency = screen.getByText('Moeda');

        fireEvent.click(orderCurrency);

        const allCells = screen.getAllByRole('cell');
        const rowsData = getRowsData(allCells);

        expect(rowsData).toEqual(ascOrder);
      });
    });

    describe('rate', () => {
      it('should order currency desc', () => {
        setup({ data: dataMock.slice(0, 5) });

        const descOrder = [
          ['ANG', 'R$ 2,65', '23/07/2023'],
          ['AED', 'R$ 1,30', '23/07/2023'],
          ['AFN', 'R$ 0,06', '23/07/2023'],
          ['ALL', 'R$ 0,06', '23/07/2023'],
          ['AMD', 'R$ 0,01', '23/07/2023'],
        ];

        const orderRate = screen.getByText('Valor (em BRL)');

        fireEvent.click(orderRate);
        fireEvent.click(orderRate);

        const allCells = screen.getAllByRole('cell');
        const rowsData = getRowsData(allCells);

        expect(rowsData).toEqual(descOrder);
      });

      it('should order currency asc', () => {
        setup({ data: dataMock.slice(0, 5) });

        const ascOrder = [
          ['AMD', 'R$ 0,01', '23/07/2023'],
          ['AFN', 'R$ 0,06', '23/07/2023'],
          ['ALL', 'R$ 0,06', '23/07/2023'],
          ['AED', 'R$ 1,30', '23/07/2023'],
          ['ANG', 'R$ 2,65', '23/07/2023'],
        ];

        const orderRate = screen.getByText('Valor (em BRL)');

        fireEvent.click(orderRate);

        const allCells = screen.getAllByRole('cell');
        const rowsData = getRowsData(allCells);

        expect(rowsData).toEqual(ascOrder);
      });
    });
  });

  describe('paginate', () => {
    it('should render a next page when buttons is clicked', () => {
      setup();

      const secondPageData = [
        ['AOA', 'R$ 0,01', '23/07/2023'],
        ['ARS', 'R$ 0,02', '23/07/2023'],
        ['AUD', 'R$ 3,22', '23/07/2023'],
        ['AWG', 'R$ 2,65', '23/07/2023'],
        ['AZN', 'R$ 2,81', '23/07/2023'],
      ];

      const button = screen.getByRole('button', { name: 'Próxima' });

      fireEvent.click(button);
      expect(screen.getByTestId('table-pagination-current').textContent).toBe('2');

      const allCells = screen.getAllByRole('cell');
      const rowsData = getRowsData(allCells);

      expect(rowsData).toEqual(secondPageData);
    });

    it('should render a previous page when button is clicked', () => {
      setup();

      const firstPageData = [
        ['AED', 'R$ 1,30', '23/07/2023'],
        ['AFN', 'R$ 0,06', '23/07/2023'],
        ['ALL', 'R$ 0,06', '23/07/2023'],
        ['AMD', 'R$ 0,01', '23/07/2023'],
        ['ANG', 'R$ 2,65', '23/07/2023'],
      ];

      const nextButton = screen.getByRole('button', { name: 'Próxima' });
      const prevButton = screen.getByRole('button', { name: 'Anterior' });

      fireEvent.click(nextButton);
      fireEvent.click(prevButton);

      const allCells = screen.getAllByRole('cell');
      const rowsData = getRowsData(allCells);

      expect(screen.getByTestId('table-pagination-current').textContent).toBe('1');
      expect(rowsData).toEqual(firstPageData);
    });
  });
});
