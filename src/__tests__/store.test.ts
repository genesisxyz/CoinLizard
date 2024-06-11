import { useStore } from '../store';
import { FavoriteCoin } from '../types/FavoriteCoin';

describe('Store', () => {
  it('should add and remove a coin correctly', () => {
    const coin: FavoriteCoin = {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      image: '',
      marketCapRank: 1,
    };

    useStore.getState().addCoin(coin);

    expect(useStore.getState().favoriteCoins.has(coin.id)).toBe(true);

    useStore.getState().removeCoin(coin.id);

    expect(useStore.getState().favoriteCoins.has(coin.id)).toBe(false);
  });

  it('should not remove a coin if it does not exist', () => {
    const coin: FavoriteCoin = {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      image: '',
      marketCapRank: 1,
    };

    useStore.getState().removeCoin(coin.id);

    expect(useStore.getState().favoriteCoins.has(coin.id)).toBe(false);
  });

  it('should not add a coin if it already exists', () => {
    const coin: FavoriteCoin = {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      image: '',
      marketCapRank: 1,
    };

    useStore.getState().addCoin(coin);
    useStore.getState().addCoin(coin);

    expect(useStore.getState().favoriteCoins.size).toBe(1);
  });
});
