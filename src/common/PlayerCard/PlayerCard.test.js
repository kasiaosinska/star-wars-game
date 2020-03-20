import React from 'react';
import ReactDom from 'react-dom';
import PlayerCard from './PlayerCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<PlayerCard />, div);
});
