import { useState, useEffect } from 'react';

import { TForexRatesResponse, getForexRates } from './services/fixer';
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

  return <>{JSON.stringify(data, null)}</>;
}

export default App;
