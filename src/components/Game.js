import React, { useState, useEffect, useRef } from 'react';
import { Header, Board, Thinking, GameStart, GameOver } from '../components';
import { X, PLAYER, CPU, AI_LEVEL_RND } from '../constants';
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
import PropTypes from 'prop-types';

const Game = ({ aiLevel }) => {
  const [gameStatus, setGameStatus] = useState('start');
  const [gameBoard, setGameBoard] = useState({});
  const [turnHistory, setTurnHistory] = useState([]);
  const [whoseTurn, setWhoseTurn] = useState(null);
  const [sideLabels, setSideLabels] = useState({});
  const [gameResult, setGameResult] = useState(null);
  const [isCpuThinking, setIsCpuThinking] = useState(false);
  const [winsLosses, setWinsLosses] = useState({ wins: 0, losses: 0, draws: 0 });

  const initGame = (resetting) => {
    setGameStatus('start');
    setGameBoard({});
    setTurnHistory([]);
    setSideLabels(getSideLabels(X));
    setWhoseTurn(null);
    setIsCpuThinking(false);
    setGameResult(null);
  };

  const handlePlayerSelectCell = (i) => {
    if (gameStatus === 'playing') {
      processTurn({ i, gameBoard, whoseTurn, setGameBoard, setTurnHistory });
    }
  };

  // WHEN THE BOARD UPDATES, CHECK FOR GAME-END CONDITIONS
  useEffect(() => {
    const result = checkWinner(gameBoard);
    setWhoseTurn((prevWhoseTurn) => (prevWhoseTurn === PLAYER ? CPU : PLAYER));
    if (result) {
      setTurnHistory((prevTurnHistory) => [...prevTurnHistory, result]);
      setGameStatus('gameOver');
      setGameResult(result);
    }
  }, [gameBoard]);

  // ON GAME OVER, STORE TURNHISTORY IN LOCALSTORAGE FOR LATER ANALYSIS
  useEffect(() => {
    if (gameStatus === 'gameOver') {
      storeGameResults(turnHistory);
    }
  }, [gameStatus, turnHistory]);

  // ON GAMEOVER, UPDATE WIN/LOSS RECORD IN LOCALSTORAGE
  useEffect(() => {
    if (gameResult?.side) {
      setWinsLosses((prevWinsLosses) => {
        let { wins, losses, draws } = prevWinsLosses;
        if (gameResult.side === PLAYER) {
          wins += 1;
        } else if (gameResult.side === CPU) {
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
  }, [gameResult]);

  // WE USE A REF TO TRACK THE PREVIOUS VALUE FOR WHOSETURN
  const prevWhoseTurn = useRef();

  // ON WHOSETURN CHANGE, CONDITIONALLY TRIGGER CPU TURN
  useEffect(() => {
    const handleTriggerCpuTurn = async () => {
      if (gameStatus === 'playing') {
        await sleep(1000);
        await processCpuTurn({
          gameBoard,
          whoseTurn,
          aiLevel,
          setGameBoard,
          setTurnHistory,
          setIsCpuThinking,
        });
      }
    };
    // TO RECTIFY THE USE OF GAMEBOARD IN THE DEPS FOR THIS USEEFFECT
    // WE CONFIRM THAT THE WHOSETURN VALUE HAS CHANGED FIRST
    if (prevWhoseTurn.current !== whoseTurn) {
      prevWhoseTurn.current = whoseTurn;
      if (whoseTurn === CPU) {
        handleTriggerCpuTurn();
      }
    }
  }, [whoseTurn, aiLevel, gameStatus, gameBoard]);

  // INITIALIZE COMPONENT
  useEffect(() => {
    initGame(false);
    readWinsLosses(setWinsLosses);
  }, []);

  const handlePlayAgain = () => {
    initGame(true);
  };

  const showGameStart = gameStatus === 'start';

  const handleStartClick = (whoseTurn) => {
    setWhoseTurn(whoseTurn);
    setGameStatus('playing');
  };
  const handleGoToMenu = () => {
    console.log('go to menu');
  };
  const gameState = { whoseTurn, sideLabels, gameBoard, gameStatus, turnHistory };
  const handleTestReset = () => {
    setGameResult({
      side: 'cpu',
      winningPattern: 1,
    });
  };
  return (
    <div className="relative h-full">
      <Header
        gameStatus={gameStatus}
        handlePlayAgain={handlePlayAgain}
        handleTestReset={handleTestReset}
      />
      <Board
        gameState={gameState}
        handlePlayerSelectCell={handlePlayerSelectCell}
        winsLosses={winsLosses}
      />

      <Thinking isCpuThinking={isCpuThinking} aiLevel={aiLevel} />

      <GameStart show={showGameStart} handleStartClick={handleStartClick} />

      <GameOver
        gameResult={gameResult}
        handlePlayAgain={handlePlayAgain}
        handleGoToMenu={handleGoToMenu}
      />
    </div>
  );
};

Game.defaultProps = {
  aiLevel: AI_LEVEL_RND,
};

Game.propTypes = {
  aiLevel: PropTypes.string.isRequired,
};
export default Game;
