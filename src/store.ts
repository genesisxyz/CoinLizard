import { create } from 'zustand';

type Store = {
  favoriteCoins: Map<string, { id: string; name: string }>;
  addCoin: (coin: { id: string; name: string }) => void;
  removeCoin: (coinId: string) => void;
};

export const useStore = create<Store>((set) => ({
  favoriteCoins: new Map(),
  addCoin: (coin) =>
    set((state) => {
      return {
        favoriteCoins: new Map(state.favoriteCoins).set(coin.id, coin),
      };
    }),
  removeCoin: (coinId: string) =>
    set((state) => {
      const favoriteCoins = new Map(state.favoriteCoins);
      favoriteCoins.delete(coinId);
      return {
        favoriteCoins,
      };
    }),
}));
