import React from "react";
import styled, { keyframes } from "styled-components";
import { MiddleContainer, GreyOverlay } from "../commonStyles";

const Loading = () => {
  return (
    <LoadingContainer>
      <GreyOverlay />
      {/* <GreyMiddleContainer> */}
      {/* <LoadingSpinner>Loading...</LoadingSpinner> */}

      <SpinnerContainer size={50}>
      <SpinnerSVG
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <Circle
          cx="50"
          cy="50"
          r="35"
          transform="translate(50, 50)"
        />
      </SpinnerSVG>
    </SpinnerContainer>

      {/* </GreyMiddleContainer> */}
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  position: relative;
  z-index: 100;
`;

const LoadingSpinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
`;

const GreyMiddleContainer = styled(MiddleContainer)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: grey;
  z-index: 1002;
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div<{size :number }>`
  display: inline-block;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const SpinnerSVG = styled.svg`
  animation: ${spinAnimation} 1s linear infinite;
`;

const Circle = styled.circle`
  fill: none;
  stroke: ${(props) => props.color};
  stroke-width: 10;
  stroke-dasharray: 164.93361431346415 56.97787143782138;
`;