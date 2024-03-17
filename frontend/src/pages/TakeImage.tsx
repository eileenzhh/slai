import React, { Dispatch, SetStateAction, useState } from "react";
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
import Loading from "../components/Loading";
import Record from "../types/Record";
import dummyCase, { dummyRecord } from "../types/DummyCase";

interface TakeImageProps { 
  setNewRecord: Dispatch<SetStateAction<Record>>
}

const TakeImage: React.FC<TakeImageProps> = ({ setNewRecord }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const setStage = useSetStage()

  const goToPreviewImage = () => {
    setNewRecord(dummyRecord)
    setStage(STAGE_ITEMS.SUBMIT_IMAGE)
  }

  return (
    <div>
      {loading && <Loading />}
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

      <RightOrangeButton disabled={loading} onClick={goToPreviewImage}>
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
