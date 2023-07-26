import { useState, useEffect } from 'react';

import { TForexRatesResponse, getForexRates } from './services/fixer';
import Table from './components/Table';
import './App.css';

function App() {
  const [data, setData] = useState<TForexRatesResponse | undefined>();

  useEffect(() => {
    const callForexRatesAPI = async () => {
      const data = await getForexRates();
      setData(data);
    };
    callForexRatesAPI();
  }, []);

  return <>{data && <Table {...data} />}</>;
}

export default App;
