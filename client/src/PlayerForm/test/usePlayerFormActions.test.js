import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

import { usePlayerFormActions } from '../usePlayerFormActions';
import mockFetch from '../../utils/test/mockFetch';

const mockPush = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-router', () => ({
  useHistory: () => ({ push: mockPush }),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('usePlayerFormActions()', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'));
  beforeEach(() => window.fetch.mockImplementation(mockFetch));
  afterEach(() => jest.resetAllMocks());

  describe('handleCreate()', () => {
    it('should call dispatch with correct params', async () => {
      const { result } = renderHook(() => usePlayerFormActions());
      const expected = {
        payload: {
          data: {
            country: 'US',
            id: '70629df2-571a-4899-b36a-8f36c909508a',
            imageUrl:
              'https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a',
            name: 'Bob Bobbity',
            winnings: 93024,
          },
        },
        type: 'CREATE_PLAYER_SUCCESS',
      };

      act(() => {
        result.current.handleCreate({
          name: 'Bob Bobbity',
          winnings: 93024,
          country: 'US',
        });
      });

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(expected);
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('handleUpdate()', () => {
    it('should call dispatch with correct params', async () => {
      const { result } = renderHook(() => usePlayerFormActions());
      const expected = {
        payload: {
          data: {
            country: 'US',
            id: '70629df2-571a-4899-b36a-8f36c909508a',
            imageUrl:
              'https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a',
            name: 'Bobby Bobbity',
            winnings: 93024,
          },
        },
        type: 'UPDATE_PLAYER_SUCCESS',
      };

      act(() => {
        result.current.handleUpdate({
          name: 'Bobby Bobbity',
          winnings: 93024,
          country: 'US',
          id: '70629df2-571a-4899-b36a-8f36c909508a',
          imageUrl:
            'https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a',
        });
      });

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(expected);
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('handleDelete()', () => {
    it('should call dispatch with correct params', async () => {
      const { result } = renderHook(() => usePlayerFormActions());
      const expected = {
        payload: { data: '70629df2-571a-4899-b36a-8f36c909508a' },
        type: 'DELETE_PLAYER_SUCCESS',
      };

      act(() => {
        result.current.handleDelete('70629df2-571a-4899-b36a-8f36c909508a');
      });

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(expected);
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });
  });
});
