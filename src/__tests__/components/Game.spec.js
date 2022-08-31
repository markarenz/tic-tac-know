import React from 'react';
import { mockRandom } from 'jest-mock-random';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Game from '../../components/Game';
import { AI_LEVELS, X } from '../../constants';
import { act } from 'react-dom/test-utils';
import { sleep } from '../../helpers/gameLogic';

beforeEach(() => {
  mockRandom(0);
});

describe('Game', () => {
  const mocks = {
    aiLevel: AI_LEVELS.AI_LEVEL_RND,
    goToMenu: jest.fn(),
    playerSide: X,
  };
  it('renders game', () => {
    const container = render(
      <Game aiLevel={mocks.aiLevel} goToMenu={mocks.goToMenu} playerSide={mocks.playerSide} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders renders with clicks', async () => {
    mockRandom(0.5);
    const container = render(
      <Game aiLevel={mocks.aiLevel} goToMenu={mocks.goToMenu} playerSide={mocks.playerSide} />
    );

    let btnId = 'gameStart-btn-start';
    await waitFor(() => expect(screen.getByTestId(btnId)).not.toBeDisabled(), {
      timeout: 2000,
    });
    fireEvent(
      screen.getByTestId(btnId),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    btnId = 'cell-btn-1';
    await waitFor(() => expect(screen.getByTestId(btnId)).not.toBeDisabled(), {
      timeout: 2000,
    });
    await screen.findByTestId(btnId);
    fireEvent(
      screen.getByTestId(btnId),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    btnId = 'cell-btn-4';
    await waitFor(() => expect(screen.getByTestId(btnId)).not.toBeDisabled(), {
      timeout: 2000,
    });
    expect(container).toMatchSnapshot();
  });

  it('renders renders with playAgain', async () => {
    const container = render(
      <Game aiLevel={mocks.aiLevel} goToMenu={mocks.goToMenu} playerSide={mocks.playerSide} />
    );

    let btnId = 'gameStart-btn-start';
    await waitFor(() => expect(screen.getByTestId(btnId)).not.toBeDisabled(), {
      timeout: 2000,
    });
    fireEvent(
      screen.getByTestId(btnId),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    btnId = 'game-test-playAgain';
    await screen.findByTestId(btnId);
    // jest.useFakeTimers();
    fireEvent(
      screen.getByTestId(btnId),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    // jest.runAllTimers();
    expect(container).toMatchSnapshot();
  });
});
