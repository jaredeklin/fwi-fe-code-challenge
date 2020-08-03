import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PlayerForm from '../PlayerForm';

const mockPush = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({ push: mockPush }),
}));

describe('PlayerForm', () => {
  const mockSubmit = jest.fn();
  beforeEach(() => {
    render(<PlayerForm text="Create new player" onSubmit={mockSubmit} />);
  });

  test('onSubmit should not be called if form is invalid', async () => {
    userEvent.click(screen.getByTestId('player-form-submit'));
    await waitFor(() => {
      expect(mockSubmit).not.toHaveBeenCalled();
    });
  });
  test('onSubmit should be called with correct params when form is valid', async () => {
    const expected = {
      country: 'US',
      imageUrl: '',
      name: 'jared',
      winnings: 33,
    };

    userEvent.type(screen.getByTestId('player-form-name'), 'jared');
    userEvent.selectOptions(screen.getByTestId('player-form-select'), 'US');
    userEvent.type(screen.getByTestId('player-form-winnings'), '33');

    expect(screen.getByTestId('player-form-name')).toHaveValue('jared');
    expect(screen.getByTestId('player-form-select')).toHaveValue('US');
    expect(screen.getByTestId('player-form-winnings')).toHaveValue(33);

    userEvent.click(screen.getByTestId('player-form-submit'));
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(expected);
    });
  });

  test('Cancel button should call history.push() with correct params', () => {
    const cancelButton = screen.getByTestId('player-form-cancel');
    userEvent.click(cancelButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
