import React from 'react';
import PropTypes from 'prop-types';
import { PLAYER, winningPatterns } from '../constants';

const Cell = ({ i, value, handlePlayerSelectCell, whoseTurn, sideLabels, gameStatus, result }) => {
  const { winningPattern, side: winningSide } = result || {};
  const cellShadeWinner = winningPattern !== undefined ? winningPatterns[winningPattern] : [];
  const getCellClassName = () => {
    var border = '';
    switch (i) {
      case 2:
      case 8:
        border = 'border-l-2 border-r-2';
        break;
      case 4:
      case 6:
        border = 'border-t-2 border-b-2';
        break;
      case 5:
        border = 'border-2';
        break;
      default:
        break;
    }
    const bg = value ? 'bg-white' : '';
    const cellAnimsP = [
      'animate-fadeOnBgPOne',
      'animate-fadeOnBgPTwo',
      'animate-fadeOnBgPThree',
      'animate-fadeOnBgPFour',
      'animate-fadeOnBgPFive',
      'animate-fadeOnBgPSix',
      'animate-fadeOnBgPSeven',
      'animate-fadeOnBgPEight',
      'animate-fadeOnBgPNine',
    ];
    const cellAnimsC = [
      'animate-fadeOnBgCOne',
      'animate-fadeOnBgCTwo',
      'animate-fadeOnBgCThree',
      'animate-fadeOnBgCFour',
      'animate-fadeOnBgCFive',
      'animate-fadeOnBgCSix',
      'animate-fadeOnBgCSeven',
      'animate-fadeOnBgCEight',
      'animate-fadeOnBgCNine',
    ];
    const animOnGameOver = winningSide === PLAYER ? cellAnimsP[i - 1] : cellAnimsC[i - 1];
    const bgAnim = cellShadeWinner && cellShadeWinner.includes(i) ? animOnGameOver : '';
    return `${border} ${bg} ${bgAnim}`;
  };
  const isDisabled = whoseTurn !== PLAYER || gameStatus !== 'playing';
  return (
    <div className={`text-center border-gray-500 h-32 ${getCellClassName()}`} id={`cell-${i}`}>
      {value ? (
        <div className="w-full h-full relative flex justify-center items-center">
          <div className="text-3xl animate-zoomDown">{sideLabels[value]}</div>
        </div>
      ) : (
        <button
          className="w-full h-full"
          onClick={() => handlePlayerSelectCell(i)}
          disabled={isDisabled}
        >
          &nbsp;
        </button>
      )}
    </div>
  );
};

Cell.propTypes = {
  i: PropTypes.number.isRequired,
  value: PropTypes.string,
  handlePlayerSelectCell: PropTypes.func.isRequired,
  whoseTurn: PropTypes.string.isRequired,
  sideLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  gameStatus: PropTypes.string.isRequired,
  result: PropTypes.shape({}),
};

export default Cell;
