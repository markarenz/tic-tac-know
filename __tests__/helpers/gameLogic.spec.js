import { sleep } from '../../src/helpers/gameLogic';

// import {
//   processTurn,
//   processCpuTurn,
//   getSideLabels,
//   checkWinner,
//   cpuSelectMove,
//   storeGameResults,
//   saveWinsLosses,
//   readWinsLosses,
//   sleep,
// } from './gameLogic';

describe('sleep', () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  it('returns calls setTimeout', () => {
    sleep();
    expect(setTimeout).toHaveBeenCalled();
  });
});
