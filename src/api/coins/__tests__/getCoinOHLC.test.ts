import apiClient from '../../../axios';
import { getCoinOHLC } from '../getCoinOHLC';

jest.mock('../../../axios');

const mockedAxios = apiClient as jest.Mocked<typeof apiClient>;

describe('getCoinOHLC', () => {
  it('should call the correct endpoint with the given payload', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await getCoinOHLC({ id: 'bitcoin', days: 1, vs_currency: 'usd' });
    expect(mockedAxios.get).toHaveBeenCalledWith('/coins/bitcoin/ohlc', {
      params: { days: 1, vs_currency: 'usd' },
    });
  });
});
