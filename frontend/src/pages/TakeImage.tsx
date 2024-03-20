import React, { useState } from "react";
import axios from "axios";
import cameraIcon from "../assets/camera.png";
import styled from "styled-components";

import Breadcrumb from "../components/Breadcrumb";
import { useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";

import {
  Layout,
  RightOrangeButton,
  Title,
  MiddleContainer,
} from "../commonStyles";

const TakeImage = () => {
  const setStage = useSetStage();

  const goToPreviewImage = () => {
    setStage(STAGE_ITEMS.SUBMIT_IMAGE);
  };

  return (
    <div>
      <Breadcrumb />
      <Layout>
        <Title>Take Image</Title>
        <MiddleContainer>
        <p>How to take a picture using our mobile app.</p>

          <CameraIcon>
            <img src={cameraIcon} alt="Camera Icon" />
          </CameraIcon>
          <Instructions>
            <ol>
              <li>Open the mobile app on your device</li>
              <li>Attach the phone clip to the camera</li>
              <li>Tap to manually focus on the area of the skin lesion</li>
              <li>Click 'Submit' to use the </li>
            </ol>
          </Instructions>
        </MiddleContainer>
      </Layout>

      <RightOrangeButton onClick={goToPreviewImage}>
        Next
      </RightOrangeButton>
    </div>
  );
};

export default TakeImage;

const CameraIcon = styled.div`
  display: flex;
  justify-content: center;
`;

const Instructions = styled.div`
  text-align: left;
  margin: 1rem 0;
  li {
    padding-bottom: 0.25rem;
  }
`;
