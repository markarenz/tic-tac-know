import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ gameStatus, handlePlayAgain }) => {
  return (
    <header className="flex justify-between items-center bg-purple-600/50 px-4 py-4 mb-8">
      <h1 className="text-3xl lg:text-2xl md:text-xl text-center text-white">
        <b>Tic-Tac-Know:</b> <i>A game that Learns as you play.</i>
      </h1>
      <div>
        <button
          className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4 disabled:text-gray-300 disabled:hover:bg-white disabled:hover:border-blue-500"
          onClick={handlePlayAgain}
          disabled={gameStatus !== 'gameOver'}
        >
          Play Again
        </button>
        <button className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Menu
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  handlePlayAgain: PropTypes.func.isRequired,
};
export default Header;
