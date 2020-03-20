import React from 'react';
import ReactDom from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<App />, div);
    ReactDom.unmountComponentAtNode(div);
  });

  describe('Button', () => {
    it('render button', () => {
      const { getByTestId } = render(<App />);
      expect(getByTestId('button')).toBeInTheDocument();
    });

    it('render button with text', () => {
      const { getByTestId } = render(<App />);
      expect(getByTestId('button')).toHaveTextContent('Play Game');
    });

    it('render button with text', () => {
      const { getByTestId } = render(<App />);
      expect(getByTestId('button')).toHaveTextContent('Play Game');
    });
  });
});
