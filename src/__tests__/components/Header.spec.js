import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header', () => {
  it('renders menu variant', () => {
    const container = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
