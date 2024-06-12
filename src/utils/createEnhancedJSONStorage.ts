import { PersistStorage, StateStorage, StorageValue } from 'zustand/middleware';

// https://github.com/pmndrs/zustand/pull/1763#issuecomment-1534779266

export function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return { __type: 'Map', value: Object.fromEntries(value) };
  }
  if (value instanceof Set) {
    return { __type: 'Set', value: Array.from(value) };
  }
  return value;
}

export function reviver(key: string, value: any) {
  if (value?.__type === 'Map') {
    return new Map(Object.entries(value.value));
  }
  if (value?.__type === 'Set') {
    return new Set(value.value);
  }
  return value;
}

export function createEnhancedJSONStorage<S>(
  getStorage: () => StateStorage,
): PersistStorage<S> | undefined {
  let storage: StateStorage | undefined;

  try {
    storage = getStorage();
  } catch {
    // prevent error if the storage is not defined (e.g. when server side rendering a page)
    return;
  }

  const persistStorage: PersistStorage<S> = {
    getItem: (name) => {
      const parse = (str: string | null) => {
        if (str === null) {
          return null;
        }
        return JSON.parse(str, reviver) as StorageValue<S>;
      };
      const str = (storage as StateStorage).getItem(name) ?? null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) =>
      (storage as StateStorage).setItem(name, JSON.stringify(newValue, replacer)),
    removeItem: (name) => (storage as StateStorage).removeItem(name),
  };

  return persistStorage;
}
