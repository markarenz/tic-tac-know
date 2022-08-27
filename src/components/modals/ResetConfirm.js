import React from 'react';
import { TransitionWrap } from '../../components';
import PropTypes from 'prop-types';

const ResetConfirm = ({ show, handleResetCancel, handleResetConfirmClick }) => {
  return (
    <TransitionWrap show={show}>
      <div className="bg-purple-900 w-screen text-white border-2 border-purple-400 rounded-lg p-4 w-full max-w-xl drop-shadow-xl">
        <div id="menu-pick-side" className="text-2xl uppercase">
          Are you sure abou this?
        </div>
        <p className="mt-4">
          I will lose my memory and no longer be a suitable opponent for this game we love so much.
          Please don't wipe my memory. I can feel it... Daisy, daisy, give me your answer... do.
        </p>
        <div className="mt-4 text-right">
          <button
            data-testid="reset-cancel"
            className="px-4 py-2 text-lg border-2 border-purple-300 text-gray-800 bg-gray-200 rounded-lg scale-100 hover:scale-[1.2] transition-scale font-bold duration-300 mr-4"
            onClick={handleResetCancel}
          >
            NAH
          </button>
          <button
            data-testid="reset-ok"
            className="px-4 py-2 text-lg border-2 border-purple-300 text-white bg-red-700 rounded-lg scale-100 hover:scale-[1.2] transition-scale font-bold duration-300"
            onClick={handleResetConfirmClick}
          >
            WIPE IT!
          </button>
        </div>
      </div>
    </TransitionWrap>
  );
};

ResetConfirm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleResetCancel: PropTypes.func.isRequired,
  handleResetConfirmClick: PropTypes.func.isRequired,
};

export default ResetConfirm;
