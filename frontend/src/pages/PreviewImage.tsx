import React, { useEffect } from "react";
import { useSetStage } from "../app-context/stage-context";
import Breadcrumb from "../components/Breadcrumb";
import { STAGE_ITEMS } from "../constants";
import {
  Layout,
  Title,
} from "../commonStyles";
import Record from "../types/Record";
import Spinner from "../components/Spinner";
import styled from "styled-components";

interface PreviewImageProps {
  currentRecord: Record;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ currentRecord }) => {
  const setStage = useSetStage();
  
  // TO DO: add get request
  useEffect(() => {
    setTimeout(() => {
      setStage(STAGE_ITEMS.RESULTS);
    }, 3000);
  })
  return (
    <div>
      <Layout>
        <Breadcrumb />
        <Title>Retrieving Results</Title>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
        <p>Please do not exit the page until your results are retrieved.</p>
      </Layout>
    </div>
  );
};

export default PreviewImage;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  height: 420px;
`
