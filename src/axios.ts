import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_COINGECKO_BASE_URL,
  responseType: 'json',
  headers: {
    x_cg_pro_api_key: process.env.EXPO_PUBLIC_COINGECKO_API_KEY,
  },
});

export default apiClient;
