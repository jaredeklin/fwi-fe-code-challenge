import { renderHook, act } from '@testing-library/react-hooks';
import { usePagination } from '../usePagination';
import { waitFor } from '@testing-library/react';

describe('usePagination()', () => {
  describe('setTotal()', () => {
    it('should update total and totalPages', () => {
      const { result } = renderHook(() => usePagination());
      expect(result.current.total).toBe(0);
      expect(result.current.totalPages).toBe(1);

      act(() => {
        result.current.setTotal(55);
      });

      expect(result.current.total).toBe(55);
      expect(result.current.totalPages).toBe(4);
    });
  });

  describe('setPage()', () => {
    it('should update page and from', () => {
      const { result } = renderHook(() => usePagination());
      expect(result.current.page).toBe(1);
      expect(result.current.from).toBe(0);

      act(() => {
        result.current.setPage(5);
      });

      waitFor(() => {
        expect(result.current.page).toBe(5);
        expect(result.current.from).toBe(60);
      });
    });
  });
});
