import { render, screen } from '@testing-library/react';
import Bg from '../../components/Bg';

describe('Bg', () => {
  it('renders menu variant', () => {
    const container = render(<Bg variant="menu" />);
    expect(container).toMatchSnapshot();
  });
  it('renders game variant', () => {
    const container = render(<Bg variant="game" />);
    expect(container).toMatchSnapshot();
  });
});
