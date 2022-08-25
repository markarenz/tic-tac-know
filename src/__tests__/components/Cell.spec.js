import { render, fireEvent, screen } from '@testing-library/react';
import { PLAYER, CPU } from '../../constants';
import Cell from '../../components/Cell';

describe('Bg', () => {
  const mocks = {
    i: 1,
    value: null,
    handlePlayerSelectCell: jest.fn(),
    whoseTurn: PLAYER,
    sideLabels: { player: 'x', cpu: 'o' },
    gameStatus: 'playing',
    result: null,
  };
  it('renders component', () => {
    const container = render(<Cell {...mocks} />);
    expect(container).toMatchSnapshot();
  });

  it('triggers function when clicked', () => {
    render(<Cell {...mocks} />);
    fireEvent(
      screen.getByTestId('cell-btn'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(mocks.handlePlayerSelectCell).toHaveBeenCalled();
  });

  it('has no button if value is not null', () => {
    render(<Cell {...mocks} value={PLAYER} />);
    const btn = screen.queryByTestId('cell-btn');
    expect(btn).toBe(null);
  });

  it('triggers function when clicked', () => {
    render(<Cell {...mocks} result={{ side: 'player', winningPattern: 3 }} />);
    fireEvent(
      screen.getByTestId('cell-btn'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(mocks.handlePlayerSelectCell).toHaveBeenCalled();
  });

  side: winningPattern: null;
});
