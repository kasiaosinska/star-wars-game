import styled, { keyframes } from 'styled-components';

const load = keyframes`
  0%{
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100%{
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  width : 100%
  margin: ${props => props.margin}px;
`;

export const Spinner = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;

  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 5px solid transparent;
    border-top-color: ${props => props.color};
    z-index: 100;
    animation: ${load} 1s infinite;
  }

  &:after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border-top-color: ${props => props.color};
    border: 5px solid #ccc;
  }
`;
