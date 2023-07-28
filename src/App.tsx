import { useState, useEffect } from 'react';
import './App.css';

import { TForexRates, getForexRates } from './services/fixer';
import Table from './components/Table';

const App = () => {
  const [data, setData] = useState<TForexRates>([]);

  useEffect(() => {
    const callForexRatesAPI = async () => {
      const data = await getForexRates();
      setData(data);
    };
    callForexRatesAPI();
  }, []);

  if (!data.length) return null;

  return <Table data={data} />;
};

export default App;
