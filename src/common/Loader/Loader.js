import React from 'react';
import { Wrapper, Spinner } from './styled';

const Loader = ({ color, size }) => {
  return (
    <Wrapper>
      <Spinner color={color} size={size} />
    </Wrapper>
  );
};

export default Loader;
