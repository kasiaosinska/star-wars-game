import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 30px;
  ${props =>
    props.winner ? 'border: 5px solid yellow; border-radius: 5px' : null}
`;
