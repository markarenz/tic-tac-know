import React from 'react';
import PropTypes from 'prop-types';

const MenuNav = ({ handleClickPrev, handleClickNext, mode }) => {
  return (
    <div className="grid grid-cols-2 mt-4 text-white">
      <div className="text-left">
        <button
          data-testid={`menu-nav-prev-${mode}`}
          onClick={handleClickPrev}
          className="text-4xl hover:scale-125 transition-scale duration-300"
        >
          &#9664;
        </button>
      </div>
      <div className="text-right">
        <button
          data-testid={`menu-nav-next-${mode}`}
          onClick={handleClickNext}
          className="text-4xl hover:scale-125 transition-scale duration-300"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

MenuNav.propTypes = {
  handleClickPrev: PropTypes.func.isRequired,
  handleClickNext: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};
export default MenuNav;
