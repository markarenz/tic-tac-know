import React from 'react';
import Cell from './Cell';
import { Transition } from '@tailwindui/react';
import { initOpenCells, PLAYER, CPU, whoseTurnMessages } from '../constants';
import PropTypes from 'prop-types';

const Board = ({ handlePlayerSelectCell, gameState, winsLosses }) => {
  const { whoseTurn, sideLabels, gameBoard, gameStatus, turnHistory } = gameState;
  // if (!whoseTurn) {
  //   return <div className="w-full h-screen">&nbsp;</div>;
  // }
  const result = gameStatus === 'gameOver' ? turnHistory[turnHistory.length - 1] : null;
  return (
    <div className="max-w-sm mx-auto my-4 bg-white rounded-lg p-4">
      <div className="mb-4">
        <div className="grid grid-cols-2">
          <div className="overflow-hidden">
            {whoseTurn === '' && <div> &nbsp;</div>}
            <Transition
              as="div"
              show={whoseTurn === PLAYER}
              enter="transition-all duration-500"
              enterFrom="opacity-0 -translate-x-16"
              enterTo="opacity-100 translate-x-0"
              leave="transition-all duration-500"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-16"
            >
              <div className="uppercase">
                <b>{whoseTurnMessages[PLAYER]}</b>
              </div>
            </Transition>
          </div>
          <div className="overflow-hidden">
            <Transition
              as="div"
              show={whoseTurn === CPU}
              enter="transition-all duration-500"
              enterFrom="opacity-0 translate-x-16"
              enterTo="opacity-100 translate-x-0"
              leave="transition-all duration-500"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-16"
            >
              <div className="text-right uppercase">
                <b>{whoseTurnMessages[CPU]}</b>
              </div>
            </Transition>
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
