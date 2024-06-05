import {
  addOrientationChangeListener,
  getOrientationAsync,
  Orientation,
  removeOrientationChangeListener,
} from 'expo-screen-orientation';
import { useEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';

/**
 * Get the width of the window.
 * useWindowDimensions is broken in landscape mode, this hook fixes that.
 */
export function useWindowWidth() {
  const windowDimesions = useWindowDimensions();

  const [orientation, setOrientation] = useState<Orientation>(Orientation.UNKNOWN);

  useEffect(() => {
    getOrientationAsync().then((orientation) => {
      setOrientation(orientation);
    });
    const listener = addOrientationChangeListener((event) => {
      setOrientation(event.orientationInfo.orientation);
    });

    return () => {
      removeOrientationChangeListener(listener);
    };
  }, []);

  const width = useMemo(() => {
    let width = windowDimesions.width;
    if (orientation === Orientation.LANDSCAPE_LEFT || orientation === Orientation.LANDSCAPE_RIGHT) {
      // In landscape mode, the width is usually the largest of the two dimensions
      width = Math.max(windowDimesions.width, windowDimesions.height);
    }
    return width;
  }, [orientation, windowDimesions]);

  return width;
}
