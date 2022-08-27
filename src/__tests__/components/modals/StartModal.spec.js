import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import StartModal from '../../../components/modals/StartModal';
import { AI_LEVELS, X, O } from '../../../constants';

const mocks = {
  show: true,
  handleStartClick: jest.fn(),
  handleResetClick: jest.fn(),
};
describe('StartModal - X', () => {
  it('renders component - PLAY Click', async () => {
    const container = render(
      <StartModal
        show={mocks.show}
        handleStartClick={mocks.handleStartClick}
        handleResetClick={mocks.handleResetClick}
      />
    );
    await act(async () => {
      fireEvent(
        screen.getByTestId('startmenu-play'),
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
