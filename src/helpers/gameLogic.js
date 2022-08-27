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

const getRandomMove = (openCells) => {
  const rndIndex = Math.floor(Math.random() * openCells.length);
  return openCells[rndIndex];
};

const checkNextMoveWinLoss = (gameBoard, openCells) => {
  let i = null;
  sides.forEach((s) => {
    openCells.forEach((c) => {
      const result = checkWinner({
        ...gameBoard,
        [c]: s,
      });
      if (result) {
        i = c;
      }
    });
  });
  if (i) {
    return i;
  }
  return null;
};
const cpuSelectMoveKI = (gameBoard) => {
  const openCells = getOpenCells(gameBoard);
  const immediate = checkNextMoveWinLoss(gameBoard, openCells);
  if (immediate) {
    return immediate;
  }
  // IF NO IMMEDIATE ATTACK OR DEFENSE EXISTS FOR NEXT TURN, USE RANDOM
  return getRandomMove(openCells);
};

const cpuSelectMoveSmrt = (gameBoard, turnHistory) => {
  const openCells = getOpenCells(gameBoard);
  const immediate = checkNextMoveWinLoss(gameBoard, openCells);
  if (immediate) {
    return immediate;
  }
  // READ LEGACY HISTORY FROM LOCALSTORAGE
  const legacyHistoryStr = localStorage.getItem(LOCAL_STORAGE_KEYS.HISTORY);
  const legacyHistory = legacyHistoryStr ? JSON.parse(legacyHistoryStr) : [];
  // GO THROUGH 1-9
  let topScore = -1;
  let selectedIndex = null;
  initOpenCells.forEach((c) => {
    let score = -1;
    const nextMove = { i: c, whoseTurn: CPU };
    const possibleTurnHistory = [...turnHistory, nextMove];
    legacyHistory.forEach((h) => {
      const isRelevant =
        JSON.stringify(h.slice(0, turnHistory.length + 1)) === JSON.stringify(possibleTurnHistory);
      if (isRelevant) {
        const result = h[h.length - 1];
        const movesLeft = h.length - turnHistory.length;
        if (result.side === CPU) {
          score += 10 / movesLeft;
        } else if (result.side === PLAYER) {
          score -= 10 / movesLeft;
        }
      }
    });
    if (score > topScore) {
      topScore = score;
      selectedIndex = c;
    }
  });
  if (selectedIndex) {
    return selectedIndex;
  }
  // IF ALL ELSE FAILS, GET RANDOM
  return getRandomMove(openCells);
};

const cpuSelectMove = async (gameBoard, aiLevel, turnHistory) => {
  var i = null;
  let aiLevelCheck = aiLevel;
  if (aiLevel === AI_LEVELS.AI_LEVEL_HAH) {
    const aiLevelOptions = [AI_LEVELS.AI_LEVEL_RND, AI_LEVELS.AI_LEVEL_KI, AI_LEVELS.AI_LEVEL_SMRT];
    aiLevelCheck = aiLevelOptions[Math.floor(Math.random() * aiLevelOptions.length)];
  }
  switch (aiLevelCheck) {
    case AI_LEVELS.AI_LEVEL_SMRT:
      i = cpuSelectMoveSmrt(gameBoard, turnHistory);
      break;
    case AI_LEVELS.AI_LEVEL_KI:
      i = cpuSelectMoveKI(gameBoard);
      break;
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
  const {
    gameBoard,
    whoseTurn,
    aiLevel,
    setGameBoard,
    setTurnHistory,
    setIsCpuThinking,
    turnHistory,
  } = args;
  setIsCpuThinking(true);
  // select spot based on aiLevel with fakeWait
  const i = await cpuSelectMove(gameBoard, aiLevel, turnHistory);
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
