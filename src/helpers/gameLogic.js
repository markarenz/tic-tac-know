import {
  //   symbols,
  sides,
  X,
  O,
  PLAYER,
  CPU,
  initOpenCells,
  winningPatterns,
  AI_LEVEL_RND,
  LOCAL_STORAGE_KEY,
  WINS_LOSSES_KEY,
} from '../constants';

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

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
    case AI_LEVEL_RND:
    default:
      i = cpuSelectMoveRnd(gameBoard);
      break;
  }
  await sleep(500);
  return i;
};

const processTurn = (i, gameState) => {
  const newGameBoard = {
    ...gameState.gameBoard,
    [i]: gameState.whoseTurn,
  };
  return {
    ...gameState,
    gameBoard: newGameBoard,
    turnHistory: [
      ...gameState.turnHistory,
      {
        i,
        whoseTurn: gameState.whoseTurn,
      },
    ],
  };
};

const processCpuTurn = async (gameState, setIsCpuThinking) => {
  setIsCpuThinking(true);
  // select spot based on aiLevel with fakeWait
  const i = await cpuSelectMove(gameState.gameBoard, gameState.aiLevel);
  setIsCpuThinking(false);
  const result = processTurn(i, gameState);
  return result;
};

const getSideLabels = (playerLabel) => {
  const initSideLabels = {};
  initSideLabels[PLAYER] = playerLabel === X ? X : O;
  initSideLabels[CPU] = playerLabel === X ? O : X;
  return initSideLabels;
};

const storeGameResults = (turnHistory) => {
  const legacyHistoryStr = localStorage.getItem(LOCAL_STORAGE_KEY);
  const legacyHistory = legacyHistoryStr ? JSON.parse(legacyHistoryStr) : [];
  const historyIsNew = !legacyHistory.some((h) => h === turnHistory);
  const newHistory = historyIsNew ? [...legacyHistory, turnHistory] : legacyHistory;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newHistory));
};

const saveWinsLosses = (winsLosses) => {
  localStorage.setItem(WINS_LOSSES_KEY, JSON.stringify(winsLosses));
};
const readWinsLosses = (setWinsLosses) => {
  const winsLossesStr = localStorage.getItem(WINS_LOSSES_KEY);
  if (winsLossesStr?.length > 1) {
    setWinsLosses(JSON.parse(winsLossesStr));
  }
};

export {
  processTurn,
  processCpuTurn,
  getSideLabels,
  checkWinner,
  cpuSelectMove,
  storeGameResults,
  saveWinsLosses,
  readWinsLosses,
  sleep,
};
