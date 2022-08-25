import { render, fireEvent, screen } from '@testing-library/react';
import MenuNav from '../../components/MenuNav';

describe('Thinking', () => {
  const mocks = {
    handleClickPrev: jest.fn(),
    handleClickNext: jest.fn(),
  };
  it('renders component', () => {
    const container = render(
      <MenuNav handleClickPrev={mocks.handleClickPrev} handleClickNext={mocks.handleClickNext} />
    );
    expect(container).toMatchSnapshot();
  });
  it('triggers handleClickPrev on click', () => {
    const container = render(
      <MenuNav handleClickPrev={mocks.handleClickPrev} handleClickNext={mocks.handleClickNext} />
    );
    fireEvent(
      screen.getByTestId('menu-nav-prev'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(mocks.handleClickPrev).toHaveBeenCalled();
  });
  it('triggers handleClickNext on click', () => {
    const container = render(
      <MenuNav handleClickPrev={mocks.handleClickPrev} handleClickNext={mocks.handleClickNext} />
    );
    fireEvent(
      screen.getByTestId('menu-nav-next'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(mocks.handleClickNext).toHaveBeenCalled();
  });
  it('matches snapshot', () => {
    const container = render(
      <MenuNav handleClickPrev={mocks.handleClickPrev} handleClickNext={mocks.handleClickNext} />
    );
    expect(container).toMatchSnapshot();
  });
});
