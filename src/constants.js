// STRINGS
const PLAYER = 'player';
const CPU = 'cpu';
const X = 'x';
const O = 'o';
const AI_LEVEL_RND = 'ai_level_rnd'; // Always random
const AI_LEVEL_KI = 'ai_level_ki'; // Killer instinct, random until a winning move is found
const AI_LEVEL_HAH = 'ai_level_hah'; // Half and half, sometimes SMRT and sometimes KI
const AI_LEVEL_SMRT = 'ai_level_smrt'; // Use past games to learn how to win or draw

const symbols = [X, O];
const sides = [PLAYER, CPU];
const coinSides = ['heads', 'tails'];
const initOpenCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const winningPatterns = [
  [1, 2, 3], // TOP ROW
  [4, 5, 6], // MIDDLE ROW
  [7, 8, 9], // BOTTOM ROW
  [1, 4, 7], // LEFT COL
  [2, 5, 8], // MIDDLE COL
  [3, 6, 9], // RIGHT COL
  [1, 5, 9], // TL-BR DIAG
  [3, 5, 7], // TR-BL DIAG
];
const initGameState = {
  gameStatus: 'start',
  gameBoard: {},
  aiLevel: AI_LEVEL_RND,
  turnHistory: [],
  whoseTurn: PLAYER,
  sideLabels: {},
};

const LOCAL_STORAGE_KEY = 'tic-tac-know-history';
const WINS_LOSSES_KEY = 'tic-tac-know-wins-losses';

const whoseTurnMessages = {
  player: 'Your turn',
  cpu: 'CPU Turn',
};

export {
  symbols,
  sides,
  coinSides,
  PLAYER,
  CPU,
  X,
  O,
  whoseTurnMessages,
  initOpenCells,
  winningPatterns,
  AI_LEVEL_RND,
  AI_LEVEL_KI,
  AI_LEVEL_HAH,
  AI_LEVEL_SMRT,
  LOCAL_STORAGE_KEY,
  WINS_LOSSES_KEY,
  initGameState,
};
