import React, { useState, useEffect } from 'react';
import { TransitionWrap } from '../components';
import { gameOverMessages, PLAYER, CPU } from '../constants';
import { Trophy, Cpu } from '../icons';
import PropTypes from 'prop-types';

const GameOver = ({ isRestarting, gameResult, aiLevel, handleGoToMenu, handlePlayAgain }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!!gameResult?.side) {
      setTimeout(() => {
        setShow(true);
      }, 1500);
    } else {
      setShow(false);
    }
  }, [gameResult]);
  return (
    <div>
      <TransitionWrap show={show && !isRestarting} anim="fadeInOut" className="">
        <div className={`absolute left-0 top-0 w-full h-screen bg-black/60`} />
      </TransitionWrap>

      <TransitionWrap
        show={show && !isRestarting}
        className="absolute left-0 top-0 w-full h-screen flex items-center justify-center bg-black/50"
      >
        <div className="bg-purple-900 text-white border-2 border-purple-400 rounded-lg p-4 w-full max-w-lg drop-shadow-xl">
          <div className="text-center my-8">
            <div className="pb-8 animate-bounce">
              <div className="w-full flex justify-center items-center">
                {gameResult?.side === PLAYER && (
                  <div className="w-24 h-24">
                    <Trophy />
                  </div>
                )}
                {gameResult?.side === CPU && (
                  <div className="w-48 h-24 flex">
                    <Cpu aiLevel={aiLevel} />
                    <Trophy />
                  </div>
                )}
              </div>
            </div>
            <h2 className="text-3xl">{gameOverMessages[gameResult?.side]}</h2>
          </div>
          <div className="text-center">
            <button
              className="uppercase bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-900 rounded-md py-2 px-4 transition-all hover:scale-110 duration-300 mr-4"
              onClick={handleGoToMenu}
            >
              Return to Menu
            </button>
            <button
              className="uppercase bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-900 rounded-md py-2 px-4 transition-all hover:scale-110 duration-300"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      </TransitionWrap>
    </div>
  );
};

GameOver.propTypes = {
  gameResult: PropTypes.shape({
    side: PropTypes.string,
  }),
  aiLevel: PropTypes.string.isRequired,
  handleGoToMenu: PropTypes.func.isRequired,
  handlePlayAgain: PropTypes.func.isRequired,
  isRestarting: PropTypes.bool.isRequired,
};

export default GameOver;
