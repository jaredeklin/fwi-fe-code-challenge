import { renderHook, act } from '@testing-library/react-hooks';
import { useTableSort } from '../useTableSort';

describe('useTableSort()', () => {
  test('should update the sort values', () => {
    const { result } = renderHook(() => useTableSort());

    act(() => {
      result.current.changeSort('name');
    });
    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('asc');

    act(() => {
      result.current.changeSort('name');
    });

    expect(result.current.sortBy).toBe('name');
    expect(result.current.sortOrder).toBe('desc');
  });
});
