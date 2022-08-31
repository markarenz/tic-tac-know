import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Logo } from '../icons';
import { Bg, ResetConfirm, PickAiLevel, PickSide, StartModal } from '../components';
import { MENU_STATUSES } from '../constants';
import {
  handleResetClick,
  handleResetCancel,
  handleResetConfirmClick,
  handleStartClick,
  handleClickPrev,
  handleClickNext,
} from '../helpers/menuLogic';

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
            handleStartClick={() => handleStartClick(setMenuStatus)}
            handleResetClick={() => handleResetClick(setShowResetConfirm)}
          />

          <PickSide
            show={menuStatus === MENU_STATUSES.PICK_SIDE}
            playerSide={playerSide}
            handleSelectSide={handleSelectSide}
            handleClickNext={() => handleClickNext(menuStatus, setMenuStatus)}
            handleClickPrev={() => handleClickPrev(menuStatus, setMenuStatus)}
          />

          <PickAiLevel
            show={menuStatus === MENU_STATUSES.PICK_AI}
            handleSelectAiLevel={handleSelectAiLevel}
            handleClickPrev={() => handleClickPrev(menuStatus, setMenuStatus)}
            goToGame={goToGame}
            aiLevel={aiLevel}
          />

          <ResetConfirm
            show={showResetConfirm}
            handleResetCancel={() => handleResetCancel(setShowResetConfirm)}
            handleResetConfirmClick={() =>
              handleResetConfirmClick(setShowResetConfirm, handleResetGameData)
            }
          />
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
