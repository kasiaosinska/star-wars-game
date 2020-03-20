import React from 'react';
import ReactDom from 'react-dom';
import CompareCards from './CompareCards';

describe('CompareCards', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<CompareCards />, div);
  });
});
