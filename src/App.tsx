import { useState, useEffect } from 'react';

import './App.css';

import { TForexRates, getForexRates } from './services/fixer';
import Table from './components/Table';

function App() {
  const [data, setData] = useState<TForexRates>([]);

  useEffect(() => {
    const callForexRatesAPI = async () => {
      const data = await getForexRates();
      setData(data);
    };
    callForexRatesAPI();
  }, []);

  return <>{data && <Table data={data} />}</>;
}

export default App;
