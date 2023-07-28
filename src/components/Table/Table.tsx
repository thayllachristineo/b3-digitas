import { FC, useState, useMemo } from 'react';

import classes from './Table.module.css';
import { TKeys, TProps } from './Table.types';
import { transformRateToLocale, transformDateToLocale } from './Table.utils';

import { ReactComponent as Sort } from '../../assets/sort.svg';
import { ReactComponent as SortUp } from '../../assets/sortUp.svg';
import { ReactComponent as SortDown } from '../../assets/sortDown.svg';

const Table: FC<TProps> = ({ data, itemsPerPage = 5 }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: TKeys | '';
    direction: string;
  }>({
    key: '',
    direction: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    const sortedItems = [...data].sort((a, b) => {
      const sortConfigKey = sortConfig.key as TKeys;

      const aValue = a[sortConfigKey];
      const bValue = b[sortConfigKey];

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;

      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;

      return 0;
    });

    return sortedItems;
  }, [data, sortConfig]);

  const renderSortIcon = (columnKey: string) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'ascending' ? <SortUp /> : <SortDown />;
    }
    return <Sort />;
  };

  const handleSort = (key: TKeys) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleChangePage = (page: number) => setCurrentPage(page);

  return (
    <>
      <table className={classes.table}>
        <caption className={classes.table__title}>ForEx Rates</caption>
        <thead>
          <tr>
            <th id="currency" onClick={() => handleSort('currency')} className={classes.table__head}>
              Moeda {renderSortIcon('currency')}
            </th>
            <th id="rate" onClick={() => handleSort('rate')} className={classes.table__head}>
              Valor (em BRL) {renderSortIcon('rate')}
            </th>
            <th id="date" className={classes.table__head}>
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map(({ currency, date, rate }, index) => (
            <tr key={index}>
              <td className={classes.table__data}>{currency}</td>
              <td className={classes.table__data}>{transformRateToLocale(rate)}</td>
              <td className={classes.table__data}>{transformDateToLocale(date || '')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={classes.table__pagination__footer}>
        <button disabled={currentPage === 1} onClick={() => handleChangePage(currentPage - 1)}>
          Anterior
        </button>
        <span className={classes.table__pagination__current} data-testid="table-pagination-current">
          {currentPage}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => handleChangePage(currentPage + 1)}>
          Próxima
        </button>
      </div>
    </>
  );
};

export default Table;
