import { render, screen } from '@testing-library/react';
import { AI_LEVELS } from '../../constants';
import Cpu from '../../icons/Cpu';

describe('Cpu', () => {
  it('renders component - RND', () => {
    const container = render(<Cpu aiLevel={AI_LEVELS.AI_LEVEL_RND} />);
    expect(container).toMatchSnapshot();
  });
  it('renders component - KI', () => {
    const container = render(<Cpu aiLevel={AI_LEVELS.AI_LEVEL_KI} />);
    expect(container).toMatchSnapshot();
  });

  it('renders component - HAH', () => {
    const container = render(<Cpu aiLevel={AI_LEVELS.AI_LEVEL_HAH} />);
    expect(container).toMatchSnapshot();
  });

  it('renders component - SMRT', () => {
    const container = render(<Cpu aiLevel={AI_LEVELS.AI_LEVEL_SMRT} />);
    expect(container).toMatchSnapshot();
  });
});
