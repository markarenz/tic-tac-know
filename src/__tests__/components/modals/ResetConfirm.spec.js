import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ResetConfirm from '../../../components/modals/ResetConfirm';
import { AI_LEVELS, X, O } from '../../../constants';

const mocks = {
  show: true,
  playerSide: X,
  handleResetCancel: jest.fn(),
  handleResetConfirmClick: jest.fn(),
};
describe('ResetConfirm - X', () => {
  it('renders component - CANCEL Click', async () => {
    const container = render(
      <ResetConfirm
        show={mocks.show}
        handleResetCancel={mocks.handleResetCancel}
        handleResetConfirmClick={mocks.handleResetConfirmClick}
      />
    );
    await act(async () => {
      fireEvent(
        screen.getByTestId('reset-cancel'),
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
  it('renders component - OK Click', async () => {
    const container = render(
      <ResetConfirm
        show={mocks.show}
        handleResetCancel={mocks.handleResetCancel}
        handleResetConfirmClick={mocks.handleResetConfirmClick}
      />
    );
    await act(async () => {
      fireEvent(
        screen.getByTestId('reset-ok'),
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
