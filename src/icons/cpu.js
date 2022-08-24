import React from 'react';
import PropTypes from 'prop-types';
import { AI_LEVELS } from '../constants';

const Cpu = ({ aiLevel }) => {
  const { AI_LEVEL_RND, AI_LEVEL_KI, AI_LEVEL_HAH, AI_LEVEL_SMRT } = AI_LEVELS;
  const showPpp = aiLevel === AI_LEVEL_RND;
  const showFlatSmile = aiLevel === AI_LEVEL_KI;
  const showSmile = aiLevel === AI_LEVEL_HAH;
  const showSmirk = aiLevel === AI_LEVEL_SMRT;
  const showEyes = [AI_LEVEL_RND, AI_LEVEL_HAH].includes(aiLevel);
  const showWink = [AI_LEVEL_KI, AI_LEVEL_SMRT].includes(aiLevel);
  const showBrows = aiLevel === AI_LEVEL_SMRT;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 56.702 45.17" version="1.1">
      <path
        fill="gray"
        fillOpacity="1"
        stroke="#1a1a1a"
        strokeOpacity="1"
        strokeWidth="0.964"
        d="M10.245.54h36.25c3.47 0 5.246 1.82 5.246 4.081v30.85c0 2.261-1.448 4.081-3.245 4.081H8.245c-1.798 0-3.246-1.82-3.246-4.08V4.622C5 2.36 6.775.54 10.245.54z"
        display="inline"
      ></path>
      <path
        fill="#551b81"
        fillOpacity="1"
        stroke="#1a1a1a"
        strokeOpacity="1"
        strokeWidth="0.906"
        d="M8.226 4.578H48.513V33.593H8.226z"
        display="inline"
      ></path>
      <path
        fill="#b2b2b2"
        fillOpacity="0.995"
        stroke="#1a1a1a"
        strokeMiterlimit="60.9"
        strokeOpacity="1"
        strokeWidth="0.964"
        d="M.502 39.92v1.47c0 1.787 1.155 3.24 2.61 3.24h50.49c1.455 0 2.636-1.453 2.636-3.24v-1.47z"
        display="inline"
      ></path>
      <path
        fill="#333"
        fillOpacity="1"
        strokeWidth="0.892"
        d="M0 39.703l4.487-3.635h47.524l4.691 3.51z"
        display="inline"
      ></path>
      <circle
        cx="28.387"
        cy="2.547"
        r="0.75"
        fill="#330080"
        strokeWidth="0.845"
        display="inline"
      ></circle>
      {showPpp && (
        <path
          d="M20.814 21.51H36.1v6.806q0 1.386-1.019 2.385-.998.998-2.384.998h-1.692q-1.386 0-2.405-.998-.998-.999-.998-2.385v-3.403h-6.787zm8.499 3.403v1.691q0 .714.489 1.203.51.51 1.202.51h1.692q.713 0 1.202-.51.51-.49.51-1.203v-1.691z"
          fill="#fff"
          stroke="#1a1a1a"
          strokeOpacity="0"
          strokeWidth="0"
          display="inline"
        ></path>
      )}
      {showFlatSmile && (
        <path
          d="M29.379 26.6h-1.772v-.148q0-1.602-1.75-1.602h-3.52q-3.1 0-3.501-3.521h1.75q.148 1.77 1.75 1.77h3.521q1.519 0 2.636 1.182Q29.611 23.1 31.13 23.1h3.521q1.624 0 1.75-1.771h1.75q-.4 3.52-3.5 3.52H31.13q-1.75 0-1.75 1.603z"
          fill="#fff"
          stroke="#1a1a1a"
          strokeOpacity="0"
          strokeWidth="0"
          display="inline"
        ></path>
      )}
      {showSmile && (
        <path
          d="M37.9 22.106v1.713H18.994v-1.713z"
          fill="#fff"
          stroke="#1a1a1a"
          strokeOpacity="0"
          strokeWidth="0"
          display="inline"
        ></path>
      )}
      {showSmirk && (
        <path
          d="M38.026 21.165v.145q0 1.885-1.574 3.46-1.575 1.574-4.29 1.574h-7.251q-2.714 0-4.289-1.574-1.575-1.575-1.575-3.46v-.145h1.72q.207 1.74 1.72 1.74h12.1q1.533 0 1.72-1.74z"
          fill="#fff"
          stroke="#1a1a1a"
          strokeOpacity="0"
          strokeWidth="0"
          display="inline"
        ></path>
      )}
      {showEyes && (
        <path
          d="M22.225 14.692h3.404v3.404h-3.404zm8.499 0h3.383v3.404h-3.383z"
          fill="#fff"
          stroke="#1a1a1a"
          strokeOpacity="0"
          strokeWidth="0"
          display="inline"
        ></path>
      )}
      {showWink && (
        <path
          d="M25.57 14.665v3.446h-3.447q-3.055 0-3.447-3.446h1.734q.041 1.671 1.713 1.733v-1.733zm5.16 0h3.426v3.446H30.73z"
          fill="#fff"
          stroke="#1a1a1a"
          strokeOpacity="0"
          strokeWidth="0"
          display="inline"
        ></path>
      )}
      {showBrows && (
        <path
          d="M28.247 13.524l-8.373-5.351V6.165l8.373 5.35 8.373-5.35v2.008z"
          fill="#fff"
          stroke="#1a1a1a"
          strokeOpacity="0"
          strokeWidth="0"
          display="inline"
        ></path>
      )}
    </svg>
  );
};

Cpu.defaultProps = {
  aiLevel: AI_LEVELS.AI_LEVEL_RND,
};

Cpu.propTypes = {
  aiLevel: PropTypes.string.isRequired,
};
export default Cpu;
