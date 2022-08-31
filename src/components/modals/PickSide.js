import React from 'react';
import PropTypes from 'prop-types';
import { TransitionWrap, MenuNav } from '../../components';
import { X, O, sideMessages } from '../../constants';

const PickSide = ({ show, playerSide, handleSelectSide, handleClickNext, handleClickPrev }) => {
  const btnXOBaseClass =
    'text-8xl relative h-full w-full py-4 border-2 transition-all duration-300 hover:scale-[1.1]';
  const btnClasses = {
    selected:
      'bg-gradient-to-t from-yellow-900 to-yellow-400 rounded-lg border-purple-400 text-white',
    unselected: 'bg-gray-400 border-gray-800 rounded-lg relative text-gray-200',
  };

  return (
    <TransitionWrap show={show} className="">
      <div className="bg-purple-900 w-screen border-2 border-purple-400 rounded-lg p-4 w-full max-w-xl drop-shadow-xl">
        <div id="menu-pick-side" className="text-2xl uppercase text-white">
          Pick a side:
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <button
              data-testid={`test-btn-side-1`}
              onClick={() => handleSelectSide(X)}
              className={`${btnXOBaseClass} ${
                playerSide === X ? btnClasses.selected : btnClasses.unselected
              }`}
            >
              X
            </button>
          </div>
          <div className="text-center">
            <button
              data-testid={`test-btn-side-2`}
              onClick={() => handleSelectSide(O)}
              className={`${btnXOBaseClass} ${
                playerSide === O ? btnClasses.selected : btnClasses.unselected
              }`}
            >
              O
            </button>
          </div>
        </div>
        <div>
          <div className="pt-4 text-white italic text-xl leading-tight">
            {sideMessages[playerSide]}
          </div>
        </div>
        <MenuNav
          handleClickPrev={handleClickPrev}
          handleClickNext={handleClickNext}
          mode="pickSide"
        />
      </div>
    </TransitionWrap>
  );
};

PickSide.propTypes = {
  show: PropTypes.bool.isRequired,
  playerSide: PropTypes.string.isRequired,
  handleSelectSide: PropTypes.func.isRequired,
  handleClickNext: PropTypes.func.isRequired,
  handleClickPrev: PropTypes.func.isRequired,
};
export default PickSide;
