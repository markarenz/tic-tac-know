import {
  sides,
  X,
  O,
  PLAYER,
  CPU,
  initOpenCells,
  winningPatterns,
  AI_LEVELS,
  LOCAL_STORAGE_KEYS,
} from '../constants';

const sleep = (milliseconds) =>
  process.env.NODE_ENV === 'test'
    ? null
    : new Promise((resolve) => setTimeout(resolve, milliseconds));

const checkWinner = (gameBoard) => {
  var result = null;
  sides.forEach((s) => {
    if (!result) {
      winningPatterns.forEach((p, idx) => {
        let winner = true;
        p.forEach((c) => {
          if (gameBoard[c] !== s) {
            winner = false;
          }
        });
        if (winner) {
          result = {
            winningPattern: idx,
            side: s,
          };
        }
      });
      if (!result) {
        // check for draw
        var draw = true;
        initOpenCells.forEach((i) => {
          if (!gameBoard[i]) {
            draw = false;
          }
        });
        if (draw) {
          result = {
            winningPattern: null,
            side: 'draw',
          };
        }
      }
    }
  });
  return result;
};

const getOpenCells = (gameBoard) => {
  const openCells = [];
  initOpenCells.forEach((i) => {
    if (!gameBoard[i]) {
      openCells.push(i);
    }
  });
  return openCells;
};
const cpuSelectMoveRnd = (gameBoard) => {
  const openCells = getOpenCells(gameBoard);
  const rndIndex = Math.floor(Math.random() * openCells.length);
  return openCells[rndIndex];
};

const cpuSelectMove = async (gameBoard, aiLevel) => {
  var i = null;
  switch (aiLevel) {
    case AI_LEVELS.AI_LEVEL_RND:
    default:
      i = cpuSelectMoveRnd(gameBoard);
      break;
  }
  // await new Promise((resolve) => setTimeout(resolve, 500));
  await sleep(500);
  return i;
};

const processTurn = (args) => {
  const { i, gameBoard, whoseTurn, setGameBoard, setTurnHistory } = args;
  setTurnHistory((prevTurnHistory) => [
    ...prevTurnHistory,
    {
      i,
      whoseTurn,
    },
  ]);
  return setGameBoard({
    ...gameBoard,
    [i]: whoseTurn,
  });
};

const processCpuTurn = async (args) => {
  const { gameBoard, whoseTurn, aiLevel, setGameBoard, setTurnHistory, setIsCpuThinking } = args;
  setIsCpuThinking(true);
  // select spot based on aiLevel with fakeWait
  const i = await cpuSelectMove(gameBoard, aiLevel);
  setIsCpuThinking(false);
  return processTurn({ i, gameBoard, whoseTurn, setGameBoard, setTurnHistory });
};

const getSideLabels = (playerLabel) => {
  const initSideLabels = {};
  initSideLabels[PLAYER] = playerLabel === X ? X : O;
  initSideLabels[CPU] = playerLabel === X ? O : X;
  return initSideLabels;
};

const storeGameResults = (turnHistory) => {
  const legacyHistoryStr = localStorage.getItem(LOCAL_STORAGE_KEYS.HISTORY);
  const legacyHistory = legacyHistoryStr ? JSON.parse(legacyHistoryStr) : [];
  const turnHistoryStr = JSON.stringify(turnHistory);
  const historyIsNew = !legacyHistory.some((h) => JSON.stringify(h) === turnHistoryStr);
  const newHistory = historyIsNew ? [...legacyHistory, turnHistory] : legacyHistory;
  localStorage.setItem(LOCAL_STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
};

const saveWinsLosses = (winsLosses) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.WINS_LOSSES, JSON.stringify(winsLosses));
};
const readWinsLosses = (setWinsLosses) => {
  const winsLossesStr = localStorage.getItem(LOCAL_STORAGE_KEYS.WINS_LOSSES);
  if (winsLossesStr?.length > 1) {
    setWinsLosses(JSON.parse(winsLossesStr));
  }
};

export {
  processTurn,
  processCpuTurn,
  getSideLabels,
  checkWinner,
  storeGameResults,
  saveWinsLosses,
  readWinsLosses,
  sleep,
  cpuSelectMove,
};
