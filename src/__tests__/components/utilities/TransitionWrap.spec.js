import { render, screen } from '@testing-library/react';
import TransitionWrap from '../../../components/utilities/TransitionWrap';

describe('TransitionWrap', () => {
  it('renders menu variant', () => {
    render(
      <TransitionWrap show={true} anim="l2c2r" className="">
        <div data-testid="test-1">TEST</div>
      </TransitionWrap>
    );
    expect(screen.getByTestId('test-1')).toHaveTextContent('TEST');
  });
});
