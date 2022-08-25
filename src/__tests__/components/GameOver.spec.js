import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import GameOver from '../../components/GameOver';
import { AI_LEVELS, CPU, PLAYER } from '../../constants';
import * as gameLogic from '../../helpers/gameLogic';

describe('GameOver', () => {
  const mockProps = {
    isRestarting: false,
    gameResult: null,
    aiLevel: AI_LEVELS.AI_LEVEL_RND,
    handleGoToMenu: jest.fn(),
    handlePlayAgain: jest.fn(),
  };
  it('renders component winner PLAYER', () => {
    const container = render(<GameOver {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
  it('renders component winner COU', () => {
    const container = render(
      <GameOver {...mockProps} gameResult={{ side: CPU, winningPattern: 0 }} />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders component with result', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    const container = render(
      <GameOver
        {...mockProps}
        gameResult={{
          side: PLAYER,
          winningPattern: 0,
        }}
      />
    );
    act(() => {
      jest.runAllTimers();
    });
    expect(setTimeout).toHaveBeenCalled();
  });
});
