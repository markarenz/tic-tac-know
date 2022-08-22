import React from 'react';

const Bg = () => {
  return (
    <div className="absolute w-full h-full left-0 top-0">
      <div className="absolute w-full h-full left-0 top-0 w-full h-full bgPattern" />
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-t from-purple-900 mix-blend-multiply" />
    </div>
  );
};

export default Bg;
