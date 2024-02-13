import React from 'react'
import styled from 'styled-components'
import { MiddleContainer } from '../commonStyles'

const Loading = () => {


    return (
        <LoadingContainer>
        <LoadingOverlay />
        <GreyMiddleContainer>
            <LoadingSpinner>Loading...</LoadingSpinner>
        </GreyMiddleContainer>
      </LoadingContainer>
    )
}

export default Loading

const LoadingContainer = styled.div`
  position: relative;
  z-index: 1000; 
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
`