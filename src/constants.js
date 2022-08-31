// STRINGS
const PLAYER = 'player';
const CPU = 'cpu';
const X = 'x';
const O = 'o';

const AI_LEVELS = {
  AI_LEVEL_RND: 'ai_level_rnd', // Always random
  AI_LEVEL_KI: 'ai_level_ki', // Killer instinct, random until a winning move is found
  AI_LEVEL_HAH: 'ai_level_hah', // Half and half, sometimes SMRT and sometimes KI
  AI_LEVEL_SMRT: 'ai_level_smrt', // Use past games to learn how to win or draw
};

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

const LOCAL_STORAGE_KEYS = {
  HISTORY: 'tic-tac-know-history',
  WINS_LOSSES: 'tic-tac-know-wins-losses',
};

const whoseTurnMessages = {
  player: 'Your turn',
  cpu: 'CPU Turn',
};
const gameOverMessages = {
  player: 'YOU WIN!',
  cpu: 'CPU WINS',
  draw: 'The Game is a draw.',
};

const APP_STATES = {
  GAME: 'game',
  MENU: 'menu',
};

const MENU_STATUSES = {
  PICK_SIDE: 'pick-side',
  PICK_AI: 'pick-ai',
  START: 'start',
  COMPLETE: 'complete',
};

const sideMessages = {
  x: 'You are playing as X. The CPU is playing as O.',
  o: 'You are playing as O. The CPU is playing as X.',
};
const aiLevelLabels = {
  ai_level_rnd: 'Herp Derp',
  ai_level_ki: 'Killer Instinct',
  ai_level_hah: 'Half & Half',
  ai_level_smrt: 'Mastermind',
};
const aiLevelMessages = {
  ai_level_rnd:
    'Your oppnent is, to put it bluntly, not terribly bright, making moves (and inapropriate noises) at random.',
  ai_level_ki:
    'Your opponent knows enough to be annoyingly good, but just like all your friends from college, it cannot plan ahead.',
  ai_level_hah:
    'Your opponent is playing with one chip tied behind its back, using a mix of strategies, sometimes smart and sometimes not.',
  ai_level_smrt:
    "Your opponent is smarter than you are, more disciplined and, let's face it, better looking. You don't stand a chance.",
};

//
export {
  symbols,
  sides,
  coinSides,
  PLAYER,
  CPU,
  X,
  O,
  whoseTurnMessages,
  gameOverMessages,
  sideMessages,
  aiLevelMessages,
  aiLevelLabels,
  initOpenCells,
  winningPatterns,
  AI_LEVELS,
  LOCAL_STORAGE_KEYS,
  APP_STATES,
  MENU_STATUSES,
};
