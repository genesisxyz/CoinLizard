import { act, renderHook } from '@testing-library/react-native';

import { useDebounce } from '../useDebounce';

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('useDebounce', () => {
  it('should update debounced value after delay', () => {
    const initialDelay = 500;
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: initialDelay },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: initialDelay });

    act(() => {
      jest.advanceTimersByTime(initialDelay - 100); // 400ms
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(100); // Remaining 100ms
    });

    expect(result.current).toBe('updated');
  });
});
