import React from 'react';
import { Transition } from '@tailwindui/react';
import PropTypes from 'prop-types';
const TransitionWrap = ({ children, show, anim, className }) => {
  const anims = {
    l2c2r: {
      enter: 'transition-all duration-500',
      enterFrom: 'opacity-0 -translate-x-32',
      enterTo: 'opacity-100 translate-x-0',
      leave: 'transition-all duration-500',
      leaveFrom: 'opacity-100 translate-x-0',
      leaveTo: 'opacity-0 translate-x-32',
    },
    l2c2l: {
      enter: 'transition-all duration-500',
      enterFrom: 'opacity-0 -translate-x-16',
      enterTo: 'opacity-100 translate-x-0',
      leave: 'transition-all duration-500',
      leaveFrom: 'opacity-100 translate-x-0',
      leaveTo: 'opacity-0 -translate-x-16',
    },
    r2c2r: {
      enter: 'transition-all duration-500',
      enterFrom: 'opacity-0 translate-x-16',
      enterTo: 'opacity-100 translate-x-0',
      leave: 'transition-all duration-500',
      leaveFrom: 'opacity-100 translate-x-0',
      leaveTo: 'opacity-0 translate-x-16',
    },
    fadeInOut: {
      enter: 'transition-opacity duration-500',
      enterFrom: 'opacity-0',
      enterTo: 'opacity-100',
      leave: 'transition-opacity duration-500',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0',
    },
    zoomInOut: {
      enter: 'transition-all duration-500',
      enterFrom: 'opacity-0 scale-50',
      enterTo: 'opacity-100 scale-100',
      leave: 'transition-opacity duration-500',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0',
    },
  };
  return (
    <Transition
      as="div"
      show={show}
      enter={anims[anim].enter}
      enterFrom={anims[anim].enterFrom}
      enterTo={anims[anim].enterTo}
      leave={anims[anim].leave}
      leaveFrom={anims[anim].leaveFrom}
      leaveTo={anims[anim].leaveTo}
      className={className}
    >
      {children}
    </Transition>
  );
};
TransitionWrap.defaultProps = {
  anim: 'l2c2r',
  className: 'absolute left-0 top-0 w-full h-full flex items-center justify-center',
};

TransitionWrap.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  show: PropTypes.bool.isRequired,
  anim: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TransitionWrap;
