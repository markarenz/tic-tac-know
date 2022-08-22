import React, { useState, useEffect } from 'react';
import { Header, Board, Thinking, GameStart } from '../components';
import { X, PLAYER, CPU, initGameState } from '../constants';
import {
  sleep,
  processTurn,
  processCpuTurn,
  getSideLabels,
  checkWinner,
  storeGameResults,
  saveWinsLosses,
  readWinsLosses,
} from '../helpers/gameLogic';

const Game = () => {
  const [gameState, setGameState] = useState(initGameState);
  const [isCpuThinking, setIsCpuThinking] = useState(false);
  const [winsLosses, setWinsLosses] = useState({ wins: 0, losses: 0, draws: 0 });

  const initGame = (resetting) => {
    setGameState({
      ...initGameState,
      initted: false,
      reset: resetting,
      sideLabels: getSideLabels(X),
      whoseTurn: PLAYER,
    });
    setIsCpuThinking(false);
  };

  const handlePlayerSelectCell = (i) => {
    if (gameState.gameStatus === 'playing') {
      setGameState({ ...processTurn(i, gameState) });
    }
  };

  // When the board updates, check for game-end conditions
  useEffect(() => {
    // Ignore if the game is resetting
    if (gameState.gameStatus === 'start') {
      return;
    }
    const result = checkWinner(gameState.gameBoard);
    if (result?.side) {
      setWinsLosses((prevWinsLosses) => {
        let { wins, losses, draws } = prevWinsLosses;
        if (result.side === PLAYER) {
          wins += 1;
        } else if (result.side === CPU) {
          losses += 1;
        } else {
          draws += 1;
        }
        saveWinsLosses({ wins, losses, draws });
        return {
          wins,
          losses,
          draws,
        };
      });
    }
    setGameState((prevGameState) => {
      let nextTurn = prevGameState.whoseTurn === PLAYER ? CPU : PLAYER;
      return {
        ...prevGameState,
        reset: false,
        whoseTurn: nextTurn,
        turnHistory: result ? [...prevGameState.turnHistory, result] : prevGameState.turnHistory,
        gameStatus: result ? 'gameOver' : 'playing',
      };
    });
    //eslint-disable-next-line
  }, [gameState.gameBoard]);

  useEffect(() => {
    if (gameState.gameStatus === 'gameOver') {
      storeGameResults(gameState.turnHistory);
    }
  }, [gameState.gameStatus, gameState.turnHistory]);

  const handleTriggerCpuTurn = async () => {
    if (gameState.gameStatus === 'playing') {
      await sleep(1000);
      const newGameState = await processCpuTurn(gameState, setIsCpuThinking);
      setGameState({ ...newGameState });
    }
  };

  useEffect(() => {
    if (gameState.whoseTurn === CPU) {
      handleTriggerCpuTurn();
    }
    //eslint-disable-next-line
  }, [gameState.whoseTurn]);

  useEffect(() => {
    initGame(false);
    readWinsLosses(setWinsLosses);
  }, []);

  const handlePlayAgain = () => {
    initGame(true);
  };
  // const showGameOver = gameState.gameStatus === 'gameOver';
  const showGameStart = gameState.gameStatus === 'start';
  const handleStartClick = (whoseTurn) => {
    setGameState({
      ...gameState,
      whoseTurn,
      gameStatus: 'playing',
    });
  };
  return (
    <div className="relative">
      <Header gameStatus={gameState.gameStatus} handlePlayAgain={handlePlayAgain} />
      <Board
        gameState={gameState}
        handlePlayerSelectCell={handlePlayerSelectCell}
        winsLosses={winsLosses}
      />

      <Thinking isCpuThinking={isCpuThinking} aiLevel={gameState.aiLevel} />

      <GameStart show={showGameStart} handleStartClick={handleStartClick} />

      {/* Game over Modal VICTORY/DEFEAT - REPLAY / MENU */}
    </div>
  );
};

export default Game;
