import React, { useState } from "react";
import styled from "styled-components";
import uploadIcon from "../assets/upload.png";
import {
  Title,
  MiddleContainer,
  OrangeButton,
  MainImage,
  Layout,
  LeftRightButtonContainer,
} from "../commonStyles";
import axios from "axios";
import { useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import getImageUrl from "../utils/getImageUrl";

interface FileUploadProps {
  onBack: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onBack }) => {
  const setStage = useSetStage();

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
    const fileInput = document.getElementById("file-input");
    fileInput?.click();
  };

  const sendImage = async () => {
    const response = await axios.post("http://localhost:5000/image", {
      image: uploadFileString,
    });
    console.log(response);
    setStage(STAGE_ITEMS.SUBMIT_IMAGE);
  };

  return (
    <Layout>
      <Title>Upload Image</Title>
      <MiddleContainer>
        <form>
          <StyledInput
            id="file-input"
            type="file"
            onChange={(e) => onUpload(e)}
          ></StyledInput>
        </form>
        {uploadFileString ? (
          <UploadedImg src={getImageUrl(uploadFileString)} alt="preview" />
        ) : (
          <UploadIcon>
            <UploadIconImg
              src={uploadIcon}
              onClick={handleIconClick}
              alt="upload_icon"
            />
          </UploadIcon>
        )}
      </MiddleContainer>
      <LeftRightButtonContainer>
        <OrangeButton onClick={onBack}>Back</OrangeButton>
        <OrangeButton onClick={sendImage} disabled={uploadFileString === ""}>
          Next
        </OrangeButton>
      </LeftRightButtonContainer>
    </Layout>
  );
};
export default FileUpload;

const UploadIcon = styled.label`
  margin: auto;
  &: hover {
    opacity: 0.6;
  }
`;

const UploadIconImg = styled(MainImage)`
  height: 150px;
  width: 150px;
  cursor: pointer;
`;

const UploadedImg = styled(MainImage)`
  max-height: 400px;
`;

const StyledInput = styled.input`
  cursor: pointer;
`;
