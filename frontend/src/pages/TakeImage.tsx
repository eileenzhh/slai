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
          <CameraIcon>
            <img src={cameraIcon} alt="Camera Icon" />
          </CameraIcon>
          <Instructions>
            <p>How to take a picture</p>
            <ul>
              <li>Connect mobile app</li>
              <li>Make sure to have good lighting</li>
              <li>After you take the image, click 'Next'</li>
            </ul>
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
`;
