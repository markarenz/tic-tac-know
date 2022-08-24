import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Logo, Cpu } from '../icons';
import { Bg, TransitionWrap, MenuNav } from '../components';
import {
  AI_LEVELS,
  MENU_STATUSES,
  X,
  O,
  aiLevelMessages,
  aiLevelLabels,
  sideMessages,
} from '../constants';

const Menu = ({ handleSelectAiLevel, handleSelectSide, goToGame, aiLevel, playerSide }) => {
  const [menuStatus, setMenuStatus] = useState(MENU_STATUSES.START);
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
  const aiLevelsList = [
    AI_LEVELS.AI_LEVEL_RND,
    AI_LEVELS.AI_LEVEL_KI,
    AI_LEVELS.AI_LEVEL_HAH,
    AI_LEVELS.AI_LEVEL_SMRT,
  ];
  const btnAiBaseClass =
    'relative h-full w-full border-2 transition-all duration-300 hover:scale-[1.1]';
  const btnXOBaseClass =
    'text-8xl relative h-full w-full py-4 border-2 transition-all duration-300 hover:scale-[1.1]';
  const btnClasses = {
    selected:
      'bg-gradient-to-t from-yellow-900 to-yellow-400 rounded-lg border-purple-400 text-white',
    unselected: 'bg-gray-400 border-gray-800 rounded-lg relative text-gray-200',
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

          <TransitionWrap show={menuStatus === MENU_STATUSES.START} className="text-center">
            <div className="text-center mt-16 inline-block">
              <div className="relative">
                <div className="animate-pingSlowSm absolute top-0 left-0 inline-flex h-full w-full rounded-lg bg-purple-800 opacity-100"></div>
                <button
                  className="relative px-16 py-4 text-4xl border-2 border-purple-300 text-white bg-gradient-to-t from-black to-purple-700 rounded-lg scale-100 hover:scale-[1.2] transition-scale font-bold duration-300"
                  onClick={handleStartClick}
                >
                  PLAY
                </button>
              </div>
            </div>
          </TransitionWrap>

          <TransitionWrap show={menuStatus === MENU_STATUSES.PICK_SIDE} className="">
            <div className="bg-purple-900 w-screen border-2 border-purple-400 rounded-lg p-4 w-full max-w-xl drop-shadow-xl">
              <div id="menu-pick-side" className="text-2xl uppercase text-white">
                Pick a side:
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <button
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
              <MenuNav handleClickPrev={handleClickPrev} handleClickNext={handleClickNext} />
            </div>
          </TransitionWrap>

          <TransitionWrap show={menuStatus === MENU_STATUSES.PICK_AI} className="">
            <div className="bg-purple-900 w-screen text-white border-2 border-purple-400 rounded-lg p-4 w-full max-w-xl drop-shadow-xl">
              <div id="menu-pick-side" className="text-2xl uppercase">
                Pick your AI opponent:
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {aiLevelsList.map((l, idx) => (
                  <div key={`ai-option-${idx}`}>
                    <button
                      onClick={() => handleSelectAiLevel(l)}
                      className={`${btnAiBaseClass} ${
                        aiLevel === l ? btnClasses.selected : btnClasses.unselected
                      }`}
                    >
                      <div className="p-2">
                        <Cpu aiLevel={l} />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
              <h2 className="pt-4 text-2xl font-bold">{aiLevelLabels[aiLevel]}</h2>
              <div className="text-white italic text-xl pt-1 leading-tight">
                {aiLevelMessages[aiLevel]}
              </div>
              <MenuNav handleClickPrev={handleClickPrev} handleClickNext={goToGame} />
            </div>
          </TransitionWrap>
        </div>
      </div>
    </div>
  );
};

Menu.propTypes = {
  handleSelectAiLevel: PropTypes.func.isRequired,
  goToGame: PropTypes.func.isRequired,
  handleSelectSide: PropTypes.func.isRequired,
  aiLevel: PropTypes.string.isRequired,
  playerSide: PropTypes.string.isRequired,
};
export default Menu;
