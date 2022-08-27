import { render, screen } from '@testing-library/react';
import Ban from '../../icons/Ban';

describe('Ban', () => {
  it('renders component', () => {
    const container = render(<Ban />);
    expect(container).toMatchSnapshot();
  });
});
