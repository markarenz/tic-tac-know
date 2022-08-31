import { MENU_STATUSES } from '../constants';

const handleResetClick = (setShowResetConfirm) => {
  setShowResetConfirm(true);
};
const handleResetCancel = (setShowResetConfirm) => {
  setShowResetConfirm(false);
};
const handleResetConfirmClick = (setShowResetConfirm, handleResetGameData) => {
  setShowResetConfirm(false);
  handleResetGameData();
};
const handleStartClick = (setMenuStatus) => {
  setMenuStatus('');
  setTimeout(() => {
    setMenuStatus(MENU_STATUSES.PICK_SIDE);
  }, 750);
};
const handleClickPrev = (menuStatus, setMenuStatus) => {
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
const handleClickNext = (menuStatus, setMenuStatus) => {
  if (menuStatus === MENU_STATUSES.PICK_SIDE) {
    setMenuStatus('');
    setTimeout(() => {
      setMenuStatus(MENU_STATUSES.PICK_AI);
    }, 750);
  }
};

export {
  handleResetClick,
  handleResetCancel,
  handleResetConfirmClick,
  handleStartClick,
  handleClickPrev,
  handleClickNext,
};
