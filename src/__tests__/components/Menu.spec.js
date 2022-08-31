import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { mockRandom } from 'jest-mock-random';
import { act } from 'react-dom/test-utils';
import Menu from '../../components/Menu';
import { AI_LEVELS, MENU_STATUSES, X } from '../../constants';
import { sleep } from '../../helpers/gameLogic';

beforeEach(() => {
  mockRandom(0);
});

describe('Menu', () => {
  const mocks = {
    handleSelectAiLevel: jest.fn(),
    handleSelectSide: jest.fn(),
    handleResetGameData: jest.fn(),
    goToGame: jest.fn(),
    aiLevel: AI_LEVELS.AI_LEVEL_RND,
    playerSide: X,
  };
  it('renders component', () => {
    const container = render(<Menu {...mocks} />);
    expect(container).toMatchSnapshot();
  });
  it('handles startmenu-play click', async () => {
    // jest.useFakeTimers();
    const container = render(<Menu {...mocks} />);
    await act(async () => {
      fireEvent(
        screen.getByTestId('startmenu-play'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });

    // await new Promise((resolve) => setTimeout(resolve, 0));
    // jest.advanceTimersByTime(750);
    // jest.runAllTimers();
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('handles startmenu-reset click', async () => {
    const container = render(<Menu {...mocks} />);
    await act(async () => {
      fireEvent(
        screen.getByTestId('startmenu-reset'),
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

  it('handles menu nav button toggling', async () => {
    act(() => {
      render(<Menu {...mocks} />);
    });
    fireEvent(
      screen.getByTestId('startmenu-play'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await screen.findByTestId('menu-nav-next-pickSide');
    fireEvent(
      screen.getByTestId('menu-nav-next-pickSide'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await screen.findByTestId('menu-nav-prev-pickAiLevel');
    fireEvent(
      screen.getByTestId('menu-nav-prev-pickAiLevel'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await screen.findByTestId('menu-nav-prev-pickSide');
    fireEvent(
      screen.getByTestId('menu-nav-prev-pickSide'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await screen.findByTestId('startmenu-play');
    expect(screen).toMatchSnapshot();
  });

  it('handles reset confirmation', async () => {
    act(() => {
      render(<Menu {...mocks} />);
    });
    fireEvent(
      screen.getByTestId('startmenu-reset'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await screen.findByTestId('reset-cancel');
    fireEvent(
      screen.getByTestId('reset-cancel'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await screen.findByTestId('startmenu-reset');
    fireEvent(
      screen.getByTestId('startmenu-reset'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    await screen.findByTestId('reset-ok');
    fireEvent(
      screen.getByTestId('reset-ok'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(mocks.handleResetGameData).toHaveBeenCalled();
  });
});
