import apiClient from '../../axios';
import { Search } from '../../types/Search';

export type GetSearchPayload = {
  /**
   * search query
   */
  query: string;
};

export const getSearch = async (payload: GetSearchPayload) => {
  const response = await apiClient.get<Search>('/search', {
    params: payload,
  });
  return response.data;
};
