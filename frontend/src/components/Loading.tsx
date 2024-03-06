import React from 'react'
import styled from 'styled-components'
import { MiddleContainer, GreyOverlay } from '../commonStyles'

const Loading = () => {


    return (
        <LoadingContainer>
        <GreyOverlay />
        {/* <GreyMiddleContainer> */}
            <LoadingSpinner>Loading...</LoadingSpinner>
        {/* </GreyMiddleContainer> */}
      </LoadingContainer>
    )
}

export default Loading

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
`