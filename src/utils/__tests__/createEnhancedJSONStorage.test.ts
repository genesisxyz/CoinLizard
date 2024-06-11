import { StateStorage } from 'zustand/middleware';

import { createEnhancedJSONStorage, replacer } from '../createEnhancedJSONStorage';

describe('createEnhancedJSONStorage', () => {
  it('should get a Map', () => {
    const getItem: StateStorage['getItem'] = jest
      .fn()
      .mockImplementation((name: string) =>
        JSON.stringify({ __type: 'Map', value: { [name]: 'value' } }),
      );
    const setItem: StateStorage['setItem'] = jest.fn().mockImplementation(async () => {});
    const removeItem: StateStorage['removeItem'] = jest.fn().mockImplementation(() => {});

    const mockGetStorage = jest.fn<StateStorage, any>(() => ({
      getItem,
      setItem,
      removeItem,
    }));

    const storage = createEnhancedJSONStorage<Map<string, any>>(mockGetStorage);

    expect(storage).toBeDefined();
    expect(mockGetStorage).toHaveBeenCalled();

    const map = storage?.getItem('key') as unknown as Map<string, any>;

    expect(map).toBeInstanceOf(Map);
    expect(map?.get('key')).toBe('value');
  });

  it('should get a Set', () => {
    const getItem: StateStorage['getItem'] = jest
      .fn()
      .mockImplementation((name: string) => JSON.stringify({ __type: 'Set', value: [name] }));
    const setItem: StateStorage['setItem'] = jest.fn().mockImplementation(async () => {});
    const removeItem: StateStorage['removeItem'] = jest.fn().mockImplementation(() => {});

    const mockGetStorage = jest.fn<StateStorage, any>(() => ({
      getItem,
      setItem,
      removeItem,
    }));

    const storage = createEnhancedJSONStorage<Map<string, any>>(mockGetStorage);

    expect(storage).toBeDefined();
    expect(mockGetStorage).toHaveBeenCalled();

    const set = storage?.getItem('key') as unknown as Set<string>;

    expect(set).toBeInstanceOf(Set);
    expect(set?.has('key')).toBe(true);
  });

  it('should return undefined if the storage is not defined', () => {
    const mockGetStorage = jest.fn<StateStorage, any>(() => {
      throw new Error('Storage is not defined');
    });

    const storage = createEnhancedJSONStorage(mockGetStorage);

    expect(storage).toBeUndefined();
    expect(mockGetStorage).toHaveBeenCalled();
  });

  it('should remove an item', () => {
    const getItem: StateStorage['getItem'] = jest.fn().mockImplementation(() => null);
    const setItem: StateStorage['setItem'] = jest.fn().mockImplementation(async () => {});
    const removeItem: StateStorage['removeItem'] = jest.fn().mockImplementation(() => {});

    const mockGetStorage = jest.fn<StateStorage, any>(() => ({
      getItem,
      setItem,
      removeItem,
    }));

    const storage = createEnhancedJSONStorage(mockGetStorage);

    expect(storage).toBeDefined();
    expect(mockGetStorage).toHaveBeenCalled();

    storage?.removeItem('key');

    expect(removeItem).toHaveBeenCalledWith('key');
  });

  it('should get wrong key', () => {
    const getItem: StateStorage['getItem'] = jest.fn().mockImplementation(() => null);
    const setItem: StateStorage['setItem'] = jest.fn().mockImplementation(async () => {});
    const removeItem: StateStorage['removeItem'] = jest.fn().mockImplementation(() => {});

    const mockGetStorage = jest.fn<StateStorage, any>(() => ({
      getItem,
      setItem,
      removeItem,
    }));

    const storage = createEnhancedJSONStorage(mockGetStorage);

    expect(storage).toBeDefined();
    expect(mockGetStorage).toHaveBeenCalled();

    const map = storage?.getItem('key') as unknown as Map<string, any>;

    expect(map?.get('key')).toBe(undefined);
  });
  it('should set a Map', () => {
    const getItem: StateStorage['getItem'] = jest.fn().mockImplementation(() => null);
    const setItem: StateStorage['setItem'] = jest.fn().mockImplementation(async () => {});
    const removeItem: StateStorage['removeItem'] = jest.fn().mockImplementation(() => {});

    const mockGetStorage = jest.fn<StateStorage, any>(() => ({
      getItem,
      setItem,
      removeItem,
    }));

    const storage = createEnhancedJSONStorage<{ key: Map<string, any> }>(mockGetStorage);

    expect(storage).toBeDefined();
    expect(mockGetStorage).toHaveBeenCalled();

    const map = new Map([['key', 'value']]);

    const state = { state: { key: map } };

    storage?.setItem('key', state);

    expect(setItem).toHaveBeenCalledWith(
      'key',
      JSON.stringify({
        state: { key: replacer('key', map) },
      }),
    );
  });
  it('should set a Set', () => {
    const getItem: StateStorage['getItem'] = jest.fn().mockImplementation(() => null);
    const setItem: StateStorage['setItem'] = jest.fn().mockImplementation(async () => {});
    const removeItem: StateStorage['removeItem'] = jest.fn().mockImplementation(() => {});

    const mockGetStorage = jest.fn<StateStorage, any>(() => ({
      getItem,
      setItem,
      removeItem,
    }));

    const storage = createEnhancedJSONStorage<{ key: Set<string> }>(mockGetStorage);

    expect(storage).toBeDefined();
    expect(mockGetStorage).toHaveBeenCalled();

    const set = new Set(['key']);

    const state = { state: { key: set } };

    storage?.setItem('key', state);

    expect(setItem).toHaveBeenCalledWith(
      'key',
      JSON.stringify({
        state: { key: replacer('key', set) },
      }),
    );
  });
});
