import { getForexRates } from '../fixer';
import fetch from 'jest-fetch-mock';

import { SUCCESS_TRANSFORM_RESPONSE_MOCK } from '../fixer.mock';

beforeEach(() => {
  fetch.resetMocks();
});

describe('services/fixer', () => {
  xit('should return an object with forex data', async () => {
    const mockData = SUCCESS_TRANSFORM_RESPONSE_MOCK;

    fetch.mockResponse(JSON.stringify(mockData));
    const result = await getForexRates();

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalled();
  });

  it('should return an empty array when missing rates', async () => {
    fetch.mockResponse(JSON.stringify({ success: true }));
    const result = await getForexRates();

    expect(result).toEqual([]);
    expect(fetch).toHaveBeenCalled();
  });

  it('should return an empty array when success is false', async () => {
    fetch.mockResponse(JSON.stringify({ success: false }));
    const result = await getForexRates();

    expect(result).toEqual([]);
    expect(fetch).toHaveBeenCalled();
  });

  it('should return a message on console when API is down', async () => {
    const errorMessage = 'API is down!';
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    fetchMock.mockRejectOnce(new Error(errorMessage));
    const result = await getForexRates();

    expect(result).toEqual([]);
    expect(consoleErrorMock).toHaveBeenCalledWith('API is down!');
  });
});
