import React from "react";
import { useSetStage } from "../app-context/stage-context";
import Breadcrumb from "../components/Breadcrumb";
import { STAGE_ITEMS } from "../constants";
import {
  Layout,
  BottomButtonContainer,
  OrangeButton,
  MiddleContainer,
  Title,
  LeftRightButtonContainer,
} from "../commonStyles";

import styled from "styled-components";
import Record from "../types/Record";

interface ResultsProps {
  currentRecord: Record;
  saveRecord: () => void;
}

const Results: React.FC<ResultsProps> = ({ currentRecord, saveRecord }) => {
  const setStage = useSetStage();

  const onNext = () => {
    saveRecord();
    setStage(STAGE_ITEMS.EXPORT_RESULTS);
  };

  const goHome = () => {
    setStage(STAGE_ITEMS.HOME);
  };

  return (
    <div>
      <Breadcrumb />
      <Layout>
        <Title>Cases Retrieved</Title>
        <MiddleContainer>
          <img src={currentRecord.image} alt="preview" />
        </MiddleContainer>
        <p>My image</p>
        <ResultsContainer>
          <TopRow>
            {currentRecord.retrievedRecords.slice(0, 3).map((item, index) => (
              <GridItem key={index}>
                <h3>{`Result: ${index + 1}`}</h3>
                <Image src={item} alt={`Image ${index + 1}`} />
                <p>similarity: 92%</p>
              </GridItem>
            ))}
          </TopRow>
          <BottomRow>
            {currentRecord.retrievedRecords.slice(3, 5).map((item, index) => (
              <GridItem key={index}>
                <h3>{`Result: ${index + 4}`}</h3>
                <Image src={item} alt={`Image ${index + 4}`} />
                <p>image description</p>
              </GridItem>
            ))}
          </BottomRow>
        </ResultsContainer>

        {!currentRecord.exported ? (
          <LeftRightButtonContainer>
            <OrangeButton onClick={goHome}>Return Home</OrangeButton>
            <OrangeButton onClick={onNext}>Save Record</OrangeButton>
          </LeftRightButtonContainer>
        ) : (
          <BottomButtonContainer>
            <OrangeButton onClick={goHome}>Return Home</OrangeButton>
          </BottomButtonContainer>
        )}
      </Layout>
    </div>
  );
};

export default Results;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns for the top row */
  gap: 16px; /* Adjust the gap between images as needed */
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled(GridContainer)`
  grid-template-rows: 1fr; /* Only one row for the top row */
`;

const BottomRow = styled(GridContainer)`
  grid-template-columns: repeat(2, 1fr); /* Two columns for the bottom row */
`;

const Image = styled.img`
  width: 12rem;
  height: 100%;
  margin: auto;
  object-fit: cover;
`;

const ResultsContainer = styled.div`
  margin: 0 4rem;
`;
