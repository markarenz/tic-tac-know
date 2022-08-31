import { render, screen } from '@testing-library/react';
import Logo from '../../icons/Logo';

describe('Logo', () => {
  it('renders component', () => {
    const container = render(<Logo />);
    expect(container).toMatchSnapshot();
  });
});
