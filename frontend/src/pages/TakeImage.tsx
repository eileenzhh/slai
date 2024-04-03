import React, { useState } from "react";
import styled from "styled-components";

import Breadcrumb from "../components/Breadcrumb";
import { useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import uploadIcon from "../assets/upload.png";

import {
  Title,
  MiddleContainer,
  Layout,
  RightOrangeButton,
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
          <RightTopOrangeButton onClick={uploadImage}>
            <UploadImg src={uploadIcon} />
            Upload Image</RightTopOrangeButton>
          <RightOrangeButton onClick={goToPreviewImage}>Next</RightOrangeButton>
        </Layout>
        }
    </div>
  );
};

export default TakeImage;

const InstructionsContainer = styled(MiddleContainer)`
  width: 600px;
`;

const RightTopOrangeButton = styled(RightOrangeButton)`
  bottom: calc(100vh - 64px - 68px - 42px);
  left: 4rem;
  right: unset;
  display: flex;
  gap: 0.75rem;
`

const UploadImg = styled.img`
  height: 60%;
  color: var(--white);

`
