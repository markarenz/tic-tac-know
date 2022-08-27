import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { mockRandom } from 'jest-mock-random';
import { act } from 'react-dom/test-utils';
import Menu from '../../components/Menu';
import { AI_LEVELS, X } from '../../constants';

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

  it('handles cancel', async () => {
    // jest.useFakeTimers();
    const container = render(<Menu {...mocks} />);
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-handleResetCancel'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    // jest.runOnlyPendingTimers();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('handles confirm reset', async () => {
    // jest.useFakeTimers();
    const container = render(<Menu {...mocks} />);
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-handleResetConfirmClick'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    // jest.runOnlyPendingTimers();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(mocks.handleResetGameData).toHaveBeenCalled();
    });
  });

  //   it('handles cancel, prev, next clicks', async () => {
  //     jest.useFakeTimers();
  //     const container = render(<Menu {...mocks} />);
  //     await act(async () => {
  //       fireEvent(
  //         screen.getByTestId('test-handleResetCancel'),
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         })
  //       );
  //       fireEvent(
  //         screen.getByTestId('test-handleClickPrev'),
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         })
  //       );
  //       fireEvent(
  //         screen.getByTestId('test-handleClickNext'),
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         })
  //       );
  //     });
  //     jest.runOnlyPendingTimers();
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //     await waitFor(() => {
  //       expect(container).toMatchSnapshot();
  //     });
  //   });
});
