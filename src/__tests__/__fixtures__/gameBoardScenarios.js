import { PLAYER, CPU } from '../../constants';

const winningScenarios = [
  {
    label: 'Top Row',
    gameBoard: {
      1: PLAYER,
      2: PLAYER,
      3: PLAYER,
    },
  },
  {
    label: 'Middle Row',
    gameBoard: {
      4: PLAYER,
      5: PLAYER,
      6: PLAYER,
    },
  },
  {
    label: 'Botom Row',
    gameBoard: {
      7: PLAYER,
      8: PLAYER,
      9: PLAYER,
    },
  },
  {
    label: 'Left Col',
    gameBoard: {
      1: PLAYER,
      4: PLAYER,
      7: PLAYER,
    },
  },
  {
    label: 'Left Col',
    gameBoard: {
      1: PLAYER,
      4: PLAYER,
      7: PLAYER,
    },
  },
  {
    label: 'Middle Col',
    gameBoard: {
      2: PLAYER,
      5: PLAYER,
      8: PLAYER,
    },
  },
  {
    label: 'Right Col',
    gameBoard: {
      3: PLAYER,
      6: PLAYER,
      9: PLAYER,
    },
  },
  {
    label: 'Diag TL-BR',
    gameBoard: {
      1: PLAYER,
      5: PLAYER,
      9: PLAYER,
    },
  },
  {
    label: 'Diag TR-BL',
    gameBoard: {
      3: PLAYER,
      5: PLAYER,
      7: PLAYER,
    },
  },
];
const drawScenario = {
  1: CPU,
  2: CPU,
  3: PLAYER,
  4: PLAYER,
  5: CPU,
  6: CPU,
  7: CPU,
  8: PLAYER,
  9: PLAYER,
};
export { winningScenarios, drawScenario };
