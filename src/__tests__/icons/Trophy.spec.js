import { render, screen } from '@testing-library/react';
import Trophy from '../../icons/Trophy';

describe('Trophy', () => {
  it('renders component', () => {
    const container = render(<Trophy />);
    expect(container).toMatchSnapshot();
  });
});
