import { render, screen } from '@testing-library/react';
import Board from '../../components/Board';
import { PLAYER, CPU } from '../../constants';

const mocks = {
  handlePlayerSelectCell: jest.fn(),
  gameState: {
    whoseTurn: PLAYER,
    sideLabels: { player: 'x', cpu: 'o' },
    gameBoard: {},
    gameStatus: 'playing',
    turnHistory: [],
  },
  winsLosses: { wins: 10, losses: 5, draws: 0 },
};
describe('Board', () => {
  it('renders board in playing mode', () => {
    const container = render(
      <Board
        handlePlayerSelectCell={mocks.handlePlayerSelectCell}
        gameState={mocks.gameState}
        winsLosses={mocks.winsLosses}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it('renders board in gameOver mode', () => {
    const container = render(
      <Board
        handlePlayerSelectCell={mocks.handlePlayerSelectCell}
        gameState={{
          ...mocks.gameState,
          gameStatus: 'gameOver',
        }}
        winsLosses={mocks.winsLosses}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("renders board with no one's turn", () => {
    const container = render(
      <Board
        handlePlayerSelectCell={mocks.handlePlayerSelectCell}
        gameState={{
          ...mocks.gameState,
          whoseTurn: '',
        }}
        winsLosses={mocks.winsLosses}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
