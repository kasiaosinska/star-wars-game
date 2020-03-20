import React from 'react';
import ReactDom from 'react-dom';
import PlayerCard from './PlayerCard';
import { create } from "react-test-renderer";

describe('PlayerCard', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<PlayerCard />, div);
  });

  it('matches the snapshot', () => {
    const app = create(<PlayerCard />);
    expect(app.toJSON()).toMatchSnapshot();
  });
});

