import apiClient from '../../../axios';
import { getSearch } from '../getSearch';

jest.mock('../../../axios');

const mockedAxios = apiClient as jest.Mocked<typeof apiClient>;

describe('getCoin', () => {
  it('should call the correct endpoint with the given coin id', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: {} });

    await getSearch({ query: 'bitcoin' });
    expect(mockedAxios.get).toHaveBeenCalledWith('/search', { params: { query: 'bitcoin' } });
  });
});
