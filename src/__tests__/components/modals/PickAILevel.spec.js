import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PickAILevel from '../../../components/modals/PickAILevel';
import { AI_LEVELS } from '../../../constants';

const mocks = {
  show: true,
  handleSelectAiLevel: jest.fn(),
  handleClickPrev: jest.fn(),
  goToGame: jest.fn(),
  aiLevel: AI_LEVELS.AI_LEVEL_RND,
};
describe('PickAILevel', () => {
  it('renders component', async () => {
    const container = render(
      <PickAILevel
        show={mocks.show}
        handleSelectAiLevel={mocks.handleSelectAiLevel}
        handleClickPrev={mocks.handleClickPrev}
        goToGame={mocks.goToGame}
        aiLevel={mocks.aiLevel}
      />
    );
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-btn-ai-2'),
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
