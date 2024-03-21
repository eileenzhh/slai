import React, { useState } from "react";
import cameraIcon from "../assets/camera.png";
import uploadIcon from "../assets/upload.png";
import styled from "styled-components";

import Breadcrumb from "../components/Breadcrumb";
import { useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";

import {
  TwoColumnLayout,
  Title,
  MiddleContainer,
  OrangeButton,
  MainImage,
} from "../commonStyles";
import axios from "axios";
import getImageUrl from "../utils/getImageUrl";

const TakeImage = () => {
  const setStage = useSetStage();

  const goToPreviewImage = () => {
    setStage(STAGE_ITEMS.SUBMIT_IMAGE);
  };

  const [uploadFileString, setUploadFileString] = useState<string>("");
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result !== null) {
          const base64String = (reader.result as string)
            .replace("data:", "")
            .replace(/^.+,/, "");
          console.log(base64String);
          setUploadFileString(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    const fileInput = document.getElementById('file-input');
    fileInput?.click();
  };

  const sendImage = async () => {
    const response = await axios.post("http://localhost:5000/image", {
      image: uploadFileString,
    });
    console.log(response);
    goToPreviewImage();
  };

  return (
    <div>
      <Breadcrumb />
      <TwoColumnLayout>
        <div>
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
                <li>Click 'Submit' to use the image from the app </li>
              </ol>
            </Instructions>
          </MiddleContainer>
          <MiddleButtonContainer>
            <OrangeButton onClick={goToPreviewImage}>Next</OrangeButton>
          </MiddleButtonContainer>
        </div>
        <div>
          <Title>Upload Image</Title>
          <MiddleContainer>
            <form>
              <StyledInput id="file-input" type="file" onChange={(e) => onUpload(e)}></StyledInput>
            </form>
            {uploadFileString ? (
              <UploadedImg src={getImageUrl(uploadFileString)} alt="preview" />
            ) : (
              <UploadIcon>
                <UploadIconImg src={uploadIcon} onClick={handleIconClick} alt="upload_icon" />
              </UploadIcon>
            )}
          </MiddleContainer>
          <MiddleButtonContainer>
            <OrangeButton
              onClick={sendImage}
              disabled={uploadFileString === ""}
            >
              Next
            </OrangeButton>
          </MiddleButtonContainer>
        </div>
      </TwoColumnLayout>
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

const MiddleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const UploadIcon = styled.label`
  margin: auto;
`;

const UploadIconImg = styled(MainImage)`

height: 150px;
width: 150px;`

const UploadedImg = styled(MainImage)`
max-height: 400px;

`;

const StyledInput = styled.input`

`
