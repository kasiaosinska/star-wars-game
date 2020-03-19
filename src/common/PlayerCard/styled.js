import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 50px;
  ${props => (props.winner ? 'border: 5px solid yellow; border-radius: 5px' : null)}
`;
