import apiClient from '../../../axios';
import { getCoin } from '../getCoin';

jest.mock('../../../axios');

const mockedAxios = apiClient as jest.Mocked<typeof apiClient>;

describe('getCoin', () => {
  it('should call the correct endpoint with the given coin id', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await getCoin({ id: 'bitcoin' });
    expect(mockedAxios.get).toHaveBeenCalledWith('/coins/bitcoin', { params: {} });
  });
});
