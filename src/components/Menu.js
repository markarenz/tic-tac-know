import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Logo } from '../icons';
import { Bg, ResetConfirm, PickAiLevel, PickSide, StartModal } from '../components';
import { MENU_STATUSES } from '../constants';

const Menu = ({
  handleSelectAiLevel,
  handleSelectSide,
  handleResetGameData,
  goToGame,
  aiLevel,
  playerSide,
}) => {
  const [menuStatus, setMenuStatus] = useState(MENU_STATUSES.START);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const handleResetClick = () => {
    setShowResetConfirm(true);
  };
  const handleResetCancel = () => {
    setShowResetConfirm(false);
  };
  const handleResetConfirmClick = () => {
    setShowResetConfirm(false);
    handleResetGameData();
  };
  const handleStartClick = () => {
    setMenuStatus('');
    setTimeout(() => {
      setMenuStatus(MENU_STATUSES.PICK_SIDE);
    }, 750);
  };
  const handleClickPrev = () => {
    if (menuStatus === MENU_STATUSES.PICK_SIDE) {
      setMenuStatus('');
      setTimeout(() => {
        setMenuStatus(MENU_STATUSES.START);
      }, 750);
    } else {
      setMenuStatus('');
      setTimeout(() => {
        setMenuStatus(MENU_STATUSES.PICK_SIDE);
      }, 750);
    }
  };
  const handleClickNext = () => {
    if (menuStatus === MENU_STATUSES.PICK_SIDE) {
      setMenuStatus('');
      setTimeout(() => {
        setMenuStatus(MENU_STATUSES.PICK_AI);
      }, 750);
    }
  };
  return (
    <div>
      <Bg variant="menu" />
      <div className="absolute left-0 top-0 w-full h-full flex justify-center">
        <div className="mt-8">
          <div className="text-center mb-8">
            <div className="w-64 h-auto mx-auto">
              <Logo />
            </div>
            <h2 className="text-xl leading-tight text-purple-400">
              <i>A game that learns as you play.</i>
            </h2>
          </div>

          <StartModal
            show={menuStatus === MENU_STATUSES.START}
            handleStartClick={handleStartClick}
            handleResetClick={handleResetClick}
          />

          <PickSide
            show={menuStatus === MENU_STATUSES.PICK_SIDE}
            playerSide={playerSide}
            handleSelectSide={handleSelectSide}
            handleClickNext={handleClickNext}
            handleClickPrev={handleClickPrev}
          />

          <PickAiLevel
            show={menuStatus === MENU_STATUSES.PICK_AI}
            handleSelectAiLevel={handleSelectAiLevel}
            handleClickPrev={handleClickPrev}
            goToGame={goToGame}
            aiLevel={aiLevel}
          />

          <ResetConfirm
            show={showResetConfirm}
            handleResetCancel={handleResetCancel}
            handleResetConfirmClick={handleResetConfirmClick}
          />
          {process.env.NODE_ENV === 'test' && (
            <div>
              <button data-testid="test-handleResetCancel" onClick={handleResetCancel}>
                test
              </button>
              <button data-testid="test-handleClickPrev" onClick={handleClickPrev}>
                test
              </button>
              <button data-testid="test-handleClickNext" onClick={handleClickNext}>
                test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Menu.propTypes = {
  handleSelectAiLevel: PropTypes.func.isRequired,
  goToGame: PropTypes.func.isRequired,
  handleSelectSide: PropTypes.func.isRequired,
  handleResetGameData: PropTypes.func.isRequired,
  aiLevel: PropTypes.string.isRequired,
  playerSide: PropTypes.string.isRequired,
};
export default Menu;
