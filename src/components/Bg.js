import React from 'react';
import PropTypes from 'prop-types';

const Bg = ({ variant }) => {
  const bgPattern = variant === 'game' ? 'bgPatternGame' : 'bgPatternMenu';
  return (
    <div className="absolute w-full h-full left-0 top-0">
      <div className={`absolute w-full h-full left-0 top-0 w-full h-full ${bgPattern}`} />
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-t from-purple-900 mix-blend-multiply" />
    </div>
  );
};

Bg.propTypes = {
  variant: PropTypes.string,
};
export default Bg;
