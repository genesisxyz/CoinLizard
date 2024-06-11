import { renderHook, waitFor } from '@testing-library/react-native';
import {
  addOrientationChangeListener,
  getOrientationAsync,
  Orientation,
  OrientationChangeEvent,
  OrientationChangeListener,
  Subscription,
} from 'expo-screen-orientation';

import { useWindowWidth } from '../useWindowWidth';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.Dimensions.get = () => ({
    width: 400,
    height: 800,
  });

  return RN;
});

jest.mock('expo-screen-orientation', () => {
  const ExpoScreenOrientation = jest.requireActual('expo-screen-orientation');

  ExpoScreenOrientation.getOrientationAsync = jest.fn().mockResolvedValue(0);
  ExpoScreenOrientation.addOrientationChangeListener = jest.fn();
  ExpoScreenOrientation.removeOrientationChangeListener = jest.fn();

  return ExpoScreenOrientation;
});

describe('useWindowWidth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the window width in portrait mode', async () => {
    const { result } = renderHook(() => useWindowWidth());

    await waitFor(() => {
      expect(result.current).toBe(400);
    });
  });

  it('should return the window width in landscape mode', async () => {
    const getOrientationAsyncMocked = jest.mocked(getOrientationAsync);
    getOrientationAsyncMocked.mockResolvedValue(Orientation.LANDSCAPE_LEFT);

    const addOrientationChangeListenerMocked = jest.mocked(addOrientationChangeListener);
    addOrientationChangeListenerMocked.mockImplementation((callback: OrientationChangeListener) => {
      callback({
        orientationInfo: {
          orientation: Orientation.LANDSCAPE_LEFT,
        },
      } as OrientationChangeEvent);

      return {
        remove: jest.fn(),
      } as Subscription;
    });

    const { result, rerender } = renderHook(() => useWindowWidth());

    await waitFor(async () => {
      await getOrientationAsync();
    });

    rerender({});

    await waitFor(async () => {
      expect(result.current).toBe(800);
    });
  });
});
