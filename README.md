# Tic-Tac-Know

This is a simple ReactJS Tic-Tac-Toe game that can learn as you play. I built something similar more
than a decade ago as a LAMP stack. This new version is much simpler to operate since it uses local
storage rather than a persistent mySQL database to store what the game learns from the player.

This project was created for a talk about React and game design. The slides for this talk can be
found here:
https://docs.google.com/presentation/d/1MEWA67gLuvhq_p9Q_pBEQ18WTCqxkCXlMgkPRK4ujVA/edit?usp=sharing

## AI Levels

The game stores each game's turns and the result (win, loss, draw) to the browser's local storage.

The player can choose which level of AI opponent to play. The first can only pick randomly from the
available open cells. The second has a killer instinct and will always pick the right move to win or
block for that turn but cannot see any moves ahead. The smartest version uses the turn histories
stored in your browser to determine the best course of action. The AI level below that (number 3)
picks from ther other 3 strategies at random.

The player can also choose to reset the game, removing the turn history data and making the
top-level AI easy to beat. That won't last long, though, because after a few dozen rounds of
training the CPU is almost unbeatable.

## Acknowledgements

- The two SVG background patterns used in the game come from Pattern Monster
  (https://pattern.monster).
- The fonts used are Raleway and Roboto Slab from Google Fonts (https://fonts.google.com/about).

## Runing & Testing

- Install the dependencies: `npm i`
- Run the game: `npm run start`
- Run the tests: `npm run test`
