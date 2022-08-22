import React, { useState } from 'react';
import { Transition } from '@tailwindui/react';
import { sleep } from '../helpers/gameLogic';
import { sides, coinSides } from '../constants';
import imgHeads from '../img/heads.png';
import imgTails from '../img/tails.png';
import PropTypes from 'prop-types';
const GameStart = ({ show, handleStartClick }) => {
  const [isExisting, setIsExiting] = useState(false);
  const [rndIndex, setRndIndex] = useState(null);
  if (rndIndex === null) {
    setRndIndex(Math.floor(Math.random() * sides.length));
  }
  const coinFlip = coinSides[rndIndex];
  const coinFlipWhoseTurn = sides[rndIndex];
  const imgSrcArr = [imgHeads, imgTails];
  const handleModalStartClick = async () => {
    setIsExiting(true);
    await sleep(500);
    setIsExiting(false);
    handleStartClick(coinFlipWhoseTurn);
  };
  if (!coinFlip) {
    return null;
  }
  return (
    <Transition
      as="div"
      show={show && !isExisting}
      enter="transition-all duration-500"
      enterFrom="opacity-0 -translate-x-32"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-500"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-32"
      className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-purple-900 text-white border-2 border-purple-400 rounded-lg p-4 w-full max-w-lg drop-shadow-xl">
        <div className="grid grid-cols-4">
          <div className="pr-2">
            <div className="h-full flex justify-center align-center">
              <div>
                <img src={imgSrcArr[rndIndex]} alt={coinFlip} />
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex justify-center items-center h-full">
              <div>
                <h2 className="text-3xl text-center">
                  <i>The coin toss came up {coinFlip}.</i>
                </h2>
                <h3 className="text-xl text-center">
                  {coinFlipWhoseTurn.toUpperCase()} goes first this time.
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <button
            className="uppercase bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-900 rounded-md py-2 px-4 transition-all hover:scale-110 duration-300"
            onClick={handleModalStartClick}
          >
            Begin
          </button>
        </div>
      </div>
    </Transition>
  );
};

GameStart.defaultPropTypes = {
  show: false,
};

GameStart.propTypes = {
  show: PropTypes.bool.isRequired,
  handleStartClick: PropTypes.func.isRequired,
};

export default GameStart;
