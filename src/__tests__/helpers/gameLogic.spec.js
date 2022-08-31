import {
  sleep,
  checkWinner,
  processTurn,
  processCpuTurn,
  getSideLabels,
  storeGameResults,
  saveWinsLosses,
  readWinsLosses,
  cpuSelectMove,
  handleResetGameData,
} from '../../helpers/gameLogic';
import { mockRandom } from 'jest-mock-random';

import { winningScenarios, drawScenario } from '../__fixtures__/gameBoardScenarios';
import { PLAYER, CPU, initOpenCells, AI_LEVELS, X, O } from '../../constants';

// jest.setTimeout(20 * 1000);
let timeoutSpy;
beforeEach(() => {
  timeoutSpy = jest.spyOn(global, 'setTimeout');
  mockRandom(0);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('sleep', () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  it('returns calls setTimeout', () => {
    // The Promises and timers are ignored in test env
    const result = sleep(500);
    expect(result).toBe(null);
  });
});

const replaceSides = (gameBoard, srch, repl) => {
  const newGameBoard = {
    ...gameBoard,
  };
  initOpenCells.forEach((i) => {
    if (newGameBoard[i] === srch) {
      newGameBoard[i] = repl;
    }
  });
  return newGameBoard;
};
describe('checkWinner', () => {
  describe('Winner: PLAYER', () => {
    winningScenarios.forEach((s, idx) => {
      it(`returns proper result for ${s.label}`, () => {
        const result = checkWinner(s.gameBoard);
        expect(result.side).toBe(PLAYER);
      });
    });
  });
  describe('Winner: CPU', () => {
    winningScenarios.forEach((s, idx) => {
      it(`returns proper result for ${s.label}`, () => {
        const result = checkWinner(replaceSides(s.gameBoard, PLAYER, CPU));
        expect(result.side).toBe(CPU);
      });
    });
  });
  describe('No result', () => {
    it('returns nothing when no winner or draw is found', () => {
      const result = checkWinner({});
      expect(result).toBe(null);
    });
  });
  describe('Draw', () => {
    it('returns draw when all squares are filled and no winner is found', () => {
      const result = checkWinner(drawScenario);
      expect(result?.side).toBe('draw');
    });
  });
});

describe('processTurn', () => {
  // jest.mock('setGameBoard', ()
  const args = {
    i: 1,
    gameBoard: {},
    whoseTurn: PLAYER,
    setGameBoard: jest.fn(),
    setTurnHistory: jest.fn(),
  };
  it('calls useState functions', () => {
    processTurn(args);
    expect(args.setGameBoard).toHaveBeenCalled();
    expect(args.setTurnHistory).toHaveBeenCalled();
  });
});

describe('processCpuTurn', () => {
  const args = {
    gameBoard: {},
    whoseTurn: CPU,
    aiLevel: AI_LEVELS.AI_LEVEL_RND,
    setGameBoard: jest.fn(),
    setTurnHistory: jest.fn(),
    setIsCpuThinking: jest.fn(),
    turnHistory: [],
  };
  it('processes CPU turn in AI_LEVEL_RND mode', () => {
    processCpuTurn(args);
    expect(args.setIsCpuThinking).toHaveBeenCalled();
  });
});

describe('getSideLabels', () => {
  it('returns array of side labels for Player = X', () => {
    const result = getSideLabels('x');
    expect(result?.cpu).toBe('o');
  });
  it('returns array of side labels for Player = O', () => {
    const result = getSideLabels('o');
    expect(result?.cpu).toBe('x');
  });
});

describe('storeGameResults', () => {
  jest.spyOn(Storage.prototype, 'setItem');
  jest.spyOn(Storage.prototype, 'getItem');
  const turnHistory = [
    { i: 5, whoseTurn: 'player' },
    { i: 7, whoseTurn: 'cpu' },
    { i: 9, whoseTurn: 'player' },
    { i: 8, whoseTurn: 'cpu' },
    { i: 1, whoseTurn: 'player' },
    { winningPattern: 6, side: 'player' },
  ];
  const turnHistory2 = [
    { i: 3, whoseTurn: 'player' },
    { i: 2, whoseTurn: 'cpu' },
    { i: 5, whoseTurn: 'player' },
    { i: 6, whoseTurn: 'cpu' },
    { i: 7, whoseTurn: 'player' },
    { winningPattern: 7, side: 'player' },
  ];

  it('triggers localstorage functions when called with no legacyHistory', () => {
    Storage.prototype.getItem = jest.fn(() => null);
    storeGameResults(turnHistory);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('triggers localstorage functions when called with legacyHistory', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([turnHistory2]));
    storeGameResults(turnHistory);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('history is not unique', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([turnHistory2]));
    storeGameResults(turnHistory2);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('saveWinsLosses', () => {
  it('triggers localstorage functions when called', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    const winsLosses = {
      wins: 10,
      losses: 2,
      draws: 0,
    };
    saveWinsLosses(winsLosses);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('readWinsLosses', () => {
  it('triggers localstorage functions when called', () => {
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify({
        wins: 123,
        losses: 12,
        draws: 1,
      })
    );
    const mocks = {
      setWinsLosses: jest.fn(),
    };
    readWinsLosses(mocks.setWinsLosses);
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('triggers localstorage functions when no winLosss history exists', () => {
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn(() => null);
    const mocks = {
      setWinsLosses: jest.fn(),
    };
    readWinsLosses(mocks.setWinsLosses);
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});

describe('cpuSelectMove', () => {
  let turnHistory = [];
  it('Select for RANDOM', async () => {
    jest.useFakeTimers();
    const asyncMock = jest.fn().mockResolvedValueOnce('first call');
    const result = await cpuSelectMove({ 1: PLAYER }, AI_LEVELS.AI_LEVEL_RND, turnHistory);
    jest.runAllTimers();
  });

  it('Select for KI', async () => {
    jest.useFakeTimers();
    const asyncMock = jest.fn().mockResolvedValueOnce('first call');
    const result = await cpuSelectMove({ 1: PLAYER }, AI_LEVELS.AI_LEVEL_KI, turnHistory);
    jest.runAllTimers();
  });
  it('Select for HAH', async () => {
    jest.useFakeTimers();
    const asyncMock = jest.fn().mockResolvedValueOnce('first call');
    const result = await cpuSelectMove({ 1: PLAYER }, AI_LEVELS.AI_LEVEL_HAH, turnHistory);
    jest.runAllTimers();
  });
  it('Select for SMRT', async () => {
    turnHistory = [
      { i: 1, whoseTurn: 'cpu' },
      { i: 5, whoseTurn: 'player' },
      { i: 2, whoseTurn: 'cpu' },
      { i: 7, whoseTurn: 'player' },
    ];
    jest.useFakeTimers();
    Storage.prototype.getItem = jest.fn(
      () =>
        '[[{"i":1,"whoseTurn":"cpu"},{"i":5,"whoseTurn":"player"},{"i":2,"whoseTurn":"cpu"},{"i":7,"whoseTurn":"player"}, {"i":3,"whoseTurn":"cpu"}, {"side": "cpu", "winningPattern": 0}],[{"i":1,"whoseTurn":"cpu"},{"i":5,"whoseTurn":"player"},{"i":2,"whoseTurn":"cpu"},{"i":7,"whoseTurn":"player"}, {"i":8,"whoseTurn":"cpu"}, {"i":9,"whoseTurn":"player"}, {"side": "player", "winningPattern": 7}]]'
    );
    let result = await cpuSelectMove({ 3: PLAYER }, AI_LEVELS.AI_LEVEL_SMRT, turnHistory);
    jest.runAllTimers();
    expect(result).toBe(3);

    Storage.prototype.getItem = jest.fn(() => '[]');
    result = await cpuSelectMove({ 3: PLAYER }, AI_LEVELS.AI_LEVEL_SMRT, []);
    jest.runAllTimers();
    expect(result).toBe(1);
  });
});

describe('handleResetGameData', () => {
  jest.spyOn(Storage.prototype, 'removeItem');
  localStorage.removeItem = jest.fn();
  handleResetGameData();
  expect(localStorage.removeItem).toHaveBeenCalled();
});
