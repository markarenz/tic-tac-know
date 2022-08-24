import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ gameStatus }) => {
  return (
    <header className="flex justify-between items-center bg-purple-600/50 px-4 py-4 mb-8 relative z-10">
      <h1 className="text-3xl lg:text-2xl md:text-xl text-center text-white">
        <b>Tic-Tac-Know:</b> <i>A game that Learns as you play.</i>
      </h1>
      <div>
        <a
          href="https://www.markmakesstuff.com"
          target="_blank"
          rel="noreferrer"
          className="text-white"
        >
          More Stuff
        </a>
      </div>
    </header>
  );
};

Header.propTypes = {
  gameStatus: PropTypes.string.isRequired,
};
export default Header;
