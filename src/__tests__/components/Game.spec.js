import React from 'react';
import { mockRandom } from 'jest-mock-random';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Game from '../../components/Game';
import { AI_LEVELS, X } from '../../constants';
import { act } from 'react-dom/test-utils';

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

  it('renders result: gameStart', async () => {
    const container = render(
      <Game aiLevel={mocks.aiLevel} goToMenu={mocks.goToMenu} playerSide={mocks.playerSide} />
    );
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-btn-game-start'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('renders game play PLAYER WIN', async () => {
    // jest.useFakeTimers();
    const container = render(
      <Game aiLevel={mocks.aiLevel} goToMenu={mocks.goToMenu} playerSide={mocks.playerSide} />
    );
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-setGameStatus-playing'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-setGameboard-player-win'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-handlePlayerSelectCell-1'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-set-game-result'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    // jest.runAllTimers();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(screen.getByTestId('game-main')).toBeTruthy();
    });
  });

  it('renders game play CPU WIN', async () => {
    // jest.useFakeTimers();
    const container = render(
      <Game aiLevel={mocks.aiLevel} goToMenu={mocks.goToMenu} playerSide={mocks.playerSide} />
    );
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-setGameStatus-playing'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-setGameboard-cpu-win'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-handlePlayerSelectCell-1'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-set-game-result'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    // jest.runAllTimers();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(screen.getByTestId('game-main')).toBeTruthy();
    });
  });

  it('renders result: playAgain', async () => {
    const container = render(
      <Game aiLevel={mocks.aiLevel} goToMenu={mocks.goToMenu} playerSide={mocks.playerSide} />
    );

    await act(async () => {
      fireEvent(
        screen.getByTestId('test-btn-play-again'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(screen.getByTestId('game-main')).toBeTruthy();
    });
  });
});
