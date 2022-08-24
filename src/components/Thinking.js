import React from 'react';
import { AI_LEVELS } from '../constants';
import { Cpu, Gear } from '../icons';
import { TransitionWrap } from '../components';
import PropTypes from 'prop-types';

const Thinking = ({ aiLevel, isCpuThinking }) => {
  return (
    <TransitionWrap
      show={isCpuThinking}
      anim="zoomInOut"
      // className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
    >
      <div className="w-full h-52 w-52 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-800 opacity-50"></span>
        <div className="relative">
          <Cpu aiLevel={aiLevel} isThinking />
          <div className="w-12 absolute top-0 left-0">
            <div className="animate-spinSlow">
              <Gear />
            </div>
          </div>
          <div className="w-12 absolute bottom-0 right-0">
            <div className="animate-spinSlow">
              <Gear />
            </div>
          </div>
        </div>
      </div>
    </TransitionWrap>
  );
};

Thinking.defaultProps = {
  aiLevel: AI_LEVELS.AI_LEVEL_RND,
  isCpuThinking: false,
};

Thinking.propTypes = {
  aiLevel: PropTypes.string.isRequired,
  isCpuThinking: PropTypes.bool.isRequired,
};
export default Thinking;
