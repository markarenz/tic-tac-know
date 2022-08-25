import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import { mockRandom } from 'jest-mock-random';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import GameStart from '../../components/GameStart';

const mocks = {
  handleStartClick: jest.fn(),
};

beforeEach(() => {
  mockRandom(0);
});

describe('GameStart', () => {
  it('matches snapshot', () => {
    const container = render(<GameStart show={true} handleStartClick={mocks.handleStartClick} />);
    expect(container).toMatchSnapshot();
  });
  it('matches snapshot show = false', () => {
    const container = render(<GameStart show={false} handleStartClick={mocks.handleStartClick} />);
    expect(container).toMatchSnapshot();
  });

  it('reacts when start is clicked', async () => {
    // jest.useFakeTimers();
    render(<GameStart show={true} handleStartClick={mocks.handleStartClick} />);
    fireEvent(
      screen.getByTestId('gameStart-btn-start'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await waitFor(() => {
      expect(mocks.handleStartClick).toHaveBeenCalled();
    });
  });
});
