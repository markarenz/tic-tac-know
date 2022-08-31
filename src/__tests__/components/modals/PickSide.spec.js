import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PickSide from '../../../components/modals/PickSide';
import { AI_LEVELS, X, O } from '../../../constants';

const mocks = {
  show: true,
  playerSide: X,
  handleSelectSide: jest.fn(),
  handleClickPrev: jest.fn(),
  handleClickNext: jest.fn(),
};
describe('PickAILevel - X', () => {
  it('renders component', async () => {
    const container = render(
      <PickSide
        show={mocks.show}
        playerSide={mocks.playerSide}
        handleSelectSide={mocks.handleSelectSide}
        handleClickPrev={mocks.handleClickPrev}
        handleClickNext={mocks.handleClickNext}
      />
    );
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-btn-side-2'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
  it('renders component - O', async () => {
    const container = render(
      <PickSide
        show={mocks.show}
        playerSide={O}
        handleSelectSide={mocks.handleSelectSide}
        handleClickPrev={mocks.handleClickPrev}
        handleClickNext={mocks.handleClickNext}
      />
    );
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-btn-side-1'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
