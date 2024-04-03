import React, { useState } from "react";
import cameraIcon from "../assets/camera.png";
import phone from "../assets/phone.png";
import styled from "styled-components";

import Breadcrumb from "../components/Breadcrumb";
import { useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";

import {
  Title,
  MiddleContainer,
  OrangeButton,
  Layout,
  LeftRightButtonContainer,
} from "../commonStyles";
import FileUpload from "../components/FileUpload";
import InstructionCarousel from "../components/InstructionCarousel";

const TakeImage = () => {
  const [uploadPage, setUploadPage] = useState<boolean>(false)
  const setStage = useSetStage();

  const goToPreviewImage = () => {
    setStage(STAGE_ITEMS.SUBMIT_IMAGE);
  };

  const uploadImage = () => {
    setUploadPage(true)
  }

  return (
    <div>
      <Breadcrumb />
        {uploadPage ? 
          <FileUpload onBack={() => setUploadPage(false)}/>
        :
        <Layout>
        <Title>Take Image</Title>
        <InstructionsContainer>
            <InstructionCarousel />
        </InstructionsContainer>
        <LeftRightButtonContainer>
          <OrangeButton onClick={uploadImage}>Upload your own image</OrangeButton>
          <OrangeButton onClick={goToPreviewImage}>Next</OrangeButton>
        </LeftRightButtonContainer>
        </Layout>
        }
    </div>
  );
};

export default TakeImage;

const InstructionsContainer = styled(MiddleContainer)`
  width: 500px;
`;
