import { render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';

import { SUCCESS_RESPONSE_MOCK } from './services/fixer/fixer.mock';
import App from './App';

const setup = () => render(<App />);

beforeEach(() => {
  fetch.resetMocks();
});

describe('<App />', () => {
  it('should render table', async () => {
    fetch.mockResponseOnce(JSON.stringify(SUCCESS_RESPONSE_MOCK));

    setup();

    const table = await screen.findByRole('table', { name: 'ForEx Rates' });

    expect(table).toBeInTheDocument();
  });

  it('should not render table if empty data', () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    const { container } = setup();

    expect(container).toBeEmptyDOMElement();
  });
});
