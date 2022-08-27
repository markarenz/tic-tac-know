import { render, screen } from '@testing-library/react';
import Gear from '../../icons/Gear';

describe('Gear', () => {
  it('renders component', () => {
    const container = render(<Gear />);
    expect(container).toMatchSnapshot();
  });
});
