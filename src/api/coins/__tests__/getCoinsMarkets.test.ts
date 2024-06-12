import apiClient from '../../../axios';
import { getCoinsMarkets } from '../getCoinsMarkets';

jest.mock('../../../axios');

const mockedAxios = apiClient as jest.Mocked<typeof apiClient>;

describe('getCoinsMarkets', () => {
  it('should call the correct endpoint with the given payload', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await getCoinsMarkets({ vs_currency: 'usd' });
    expect(mockedAxios.get).toHaveBeenCalledWith('/coins/markets', {
      params: { vs_currency: 'usd' },
    });
  });
});
