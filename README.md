# Tic-Tac-Know

This is a simple ReactJS Tic-Tac-Toe game that can learn as you play. I built something similar more
than a decade ago as a LAMP stack. This new version is much simpler to operate since it uses local
storage rather than a persistent mySQL database to store what the game learns from the player.

feat/base-game

## Flow

- Dashboard
  - Logo/Artwork
  - Play button
    - Leads you to the New Game dialog
      - Select a level of intelligence:
        - Unteachable
          - All random choices)
        - Instinctual
          - Will try to win but won't think ahead
        - Unpredictable
          - Sometimes instinctual, sometimes Smarticles)
        - Intellectual
          - Wses stored games to pick the next move
          - Always Stores all moves and outcomes in local storage
      - Training checkbox
        - Automatically checked and disabled if top level intelligence is selected
        - Optional for all others, checked by default
        - When checked, the system stores all moves and outcomes to local storage
  - Reset button
    - This button is only enabled when local storage items are detected.
    - After clicking OK on the confirmation dialog, all local storage items are removed. Reset
      button is disabled.
  - Train button
    - This will auto-play the game with the human player randomly choosing moves.
    - It might be fun to show the games in progress with `setTimeout` calls to let us see various
      moves and outcomes, but we don't need to wait for button presses in "training" mode.
- Game screen
  - Game Start Modal
    - Coin flip animation
    - Display who has the first move
    - Pick X or O
    - OK Button
  - Game Board
    - CPU Turn
      - Thinking animation...
      - Animate move
      - Check winner
    - Player turn
      - Set game status to waiting in player (enable move buttons)
      - Animate move
      - Check winner
    - Loop
  - Game Over Modal
    - Display result
    - Menu button
    - Play Again button

`npm run start`

npm install -D tailwindcss postcss autoprefixer npx tailwindcss init -p

"snapshotSerializers": ["my-serializer-module"]

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.
This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel,
ESLint, etc) right into your project so you have full control over them. All of the commands except
`eject` will still work, but they will point to the copied scripts so you can tweak them. At this
point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle
deployments, and you shouldn't feel obligated to use this feature. However we understand that this
tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here:
[https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here:
[https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here:
[https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here:
[https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here:
[https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here:
[https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
