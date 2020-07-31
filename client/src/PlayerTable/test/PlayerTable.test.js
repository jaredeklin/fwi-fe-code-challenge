import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, act } from '../../utils/test/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../../App';

import mockFetch from '../../utils/test/mockFetch';

beforeAll(() => jest.spyOn(window, 'fetch'));
beforeEach(() => window.fetch.mockImplementation(mockFetch));

describe('Player Table', () => {
  beforeEach(async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByTestId(
          'player-table-row-1547cbe1-e06a-417e-97dc-ce1de248d4e9'
        )
      ).toBeInTheDocument();
    });
  });

  test('should render the table', async () => {
    expect((await screen.findAllByRole('row')).length).toEqual(14);
  });

  test('click on new player button should redirect to new player form', async () => {
    userEvent.click(screen.getByTestId('player-add-button'));

    expect(screen.getByTestId('player-form-name')).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByTestId('player-form-cancel'));
    });

    await waitFor(() => {
      expect(
        screen.getByTestId(
          'player-table-row-1547cbe1-e06a-417e-97dc-ce1de248d4e9'
        )
      ).toBeInTheDocument();
    });
  });

  test('click on a player should redirect to update player form', async () => {
    userEvent.click(
      screen.getByTestId(
        'player-table-row-1547cbe1-e06a-417e-97dc-ce1de248d4e9'
      )
    );

    expect(screen.getByTestId('player-form-name')).toBeInTheDocument();
    expect(screen.getByTestId('player-form-name')).toHaveValue('Daanyaal Hyde');
    expect(screen.getByTestId('player-form-select')).toHaveValue('EC');
    expect(screen.getByTestId('player-form-winnings')).toHaveValue(2903);
  });
});
