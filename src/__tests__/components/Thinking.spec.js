import { render } from '@testing-library/react';
import Thinking from '../../components/Thinking';
import { AI_LEVELS } from '../../constants';

describe('Thinking', () => {
  it('renders component', () => {
    const container = render(<Thinking aiLevel={AI_LEVELS.AI_LEVEL_RND} isCpuThinking={true} />);
    expect(container).toMatchSnapshot();
  });
});
