import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { mockRandom } from 'jest-mock-random';
import App from '../App';

beforeEach(() => {
  mockRandom(0);
});

describe('App', () => {
  it('renders component', async () => {
    const container = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('fires function on selectAI', async () => {
    const container = render(<App />);
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-selectAiLevel'),
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

  it('fires function on selectSide', async () => {
    const container = render(<App />);
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-selectSide'),
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

  it('fires function on goMenu', async () => {
    const container = render(<App />);
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-goMenu'),
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
  it('fires function on goGame', async () => {
    const container = render(<App />);
    await act(async () => {
      fireEvent(
        screen.getByTestId('test-goGame'),
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

//
// reset-ok
