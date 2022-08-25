import React from 'react';
import Cell from './Cell';
import { TransitionWrap } from '../components';
import { initOpenCells, PLAYER, CPU, whoseTurnMessages } from '../constants';
import PropTypes from 'prop-types';

const Board = ({ handlePlayerSelectCell, gameState, winsLosses }) => {
  const { whoseTurn, sideLabels, gameBoard, gameStatus, turnHistory } = gameState;
  const result = gameStatus === 'gameOver' ? turnHistory[turnHistory.length - 1] : null;
  return (
    <div className="max-w-sm mx-auto my-4 bg-white rounded-lg p-4">
      <div className="mb-4">
        <div className="grid grid-cols-2">
          <div className="overflow-hidden">
            {whoseTurn === '' && <div> &nbsp;</div>}
            <TransitionWrap show={whoseTurn === PLAYER} anim="l2c2l" className="">
              <div className="uppercase">
                <b>{whoseTurnMessages[PLAYER]}</b>
              </div>
            </TransitionWrap>
          </div>
          <div className="overflow-hidden">
            <TransitionWrap as="div" show={whoseTurn === CPU} anim="r2c2r" className="">
              <div className="text-right uppercase">
                <b>{whoseTurnMessages[CPU]}</b>
              </div>
            </TransitionWrap>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {initOpenCells.map((i) => (
          <Cell
            key={`cell-${i}`}
            i={i}
            value={gameBoard[i]}
            whoseTurn={whoseTurn}
            gameStatus={gameStatus}
            sideLabels={sideLabels}
            handlePlayerSelectCell={handlePlayerSelectCell}
            result={result}
          />
        ))}
      </div>

      <div className="text-right mt-4">
        Wins: {winsLosses.wins}, Losses: {winsLosses.losses}, Draws: {winsLosses.draws}
      </div>
    </div>
  );
};

Board.defaultProps = {
  gameState: {
    whoseTurn: '',
  },
};
Board.propTypes = {
  gameState: PropTypes.shape({
    gameBoard: PropTypes.objectOf(PropTypes.string).isRequired,
    whoseTurn: PropTypes.string,
    sideLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  }),
  handlePlayerSelectCell: PropTypes.func.isRequired,
  winsLosses: PropTypes.shape({
    wins: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    draws: PropTypes.number.isRequired,
  }),
};

export default Board;
