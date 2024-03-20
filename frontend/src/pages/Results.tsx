import React, { useState } from "react";
import LazyLoad from "react-lazyload";
import { useSetStage } from "../app-context/stage-context";
import Breadcrumb from "../components/Breadcrumb";
import { STAGE_ITEMS } from "../constants";
import {
  Layout,
  OrangeButton,
  MiddleContainer,
  Title,
  LeftRightButtonContainer,
  BottomButtonContainer,
} from "../commonStyles";

import styled from "styled-components";
import Record, { Case } from "../types/Record";
import axios from "axios";
import { useCurrentRecord } from "../app-context/record-context";
import ImageModal from "../components/ImageModal";

interface ResultsProps {
  cachedRecords: Record[];
}

const Results: React.FC<ResultsProps> = ({ cachedRecords }) => {
  const setStage = useSetStage();
  const currentRecord = useCurrentRecord();
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedCase, setSelectedCase] = useState<Case>();
  // const onNext = () => {
  //   saveRecord();
  //   setStage(STAGE_ITEMS.EXPORT_RESULTS);
  // };

  const saveCurrentRecord = async () => {
    try {
      const response = await axios.post("http://localhost:5000/save", {});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const discardCurrentRecord = async () => {
    try {
      const response = await axios.post("http://localhost:5000/discard", {});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    saveCurrentRecord();
    setStage(STAGE_ITEMS.EXPORT_RESULTS);
  };

  const onDiscard = () => {
    discardCurrentRecord();
    setStage(STAGE_ITEMS.SUBMIT_IMAGE);
  };

  const onShowImageModal = (caseRecord: Case) => {
    setSelectedCase(caseRecord);
    setShowImageModal(true);
  };

  return (
    <div>
      {showImageModal && selectedCase && (
        <ImageModal
          caseRecord={selectedCase}
          onClose={() => setShowImageModal(false)}
        />
      )}
      <Breadcrumb />
      <Layout>
        <Title>Results</Title>
        <MiddleContainer>
          <img src={currentRecord.image} alt="preview" />
        </MiddleContainer>
        <p>
          {currentRecord.cases.length} cases were retrieved. Click on the image
          to get a larger view.
        </p>
        <ResultsContainer>
          <TopRow>
            {currentRecord.cases.slice(0, 3).map((item, index) => (
              <GridItem key={index}>
                <h3>{`Result ${index + 1}`}</h3>
                <LazyLoad once>
                  <Image
                    src={`/ISIC_2020_Training_JPEG/${item.filename}`}
                    alt={`Image ${index + 1}`}
                    onClick={() => onShowImageModal(item)}
                  />
                </LazyLoad>
                <p>{item.benignOrMalignant.toUpperCase()}</p>
                <p>Anatomy site: {item.location}</p>
                {item.diagnosis !== "unknown" ? (
                  <p>Diagnosis: {item.diagnosis}</p>
                ) : null}
                <p>Approximate age: {item.age}</p>
                <p>Sex: {item.sex}</p>
              </GridItem>
            ))}
          </TopRow>
          <BottomRow>
            {currentRecord.cases.slice(3, 5).map((item, index) => (
              <GridItem key={index}>
                <h3>{`Result ${index + 4}`}</h3>
                <LazyLoad once>
                  <Image
                    src={`/ISIC_2020_Training_JPEG/${item.filename}`}
                    alt={`Image ${index + 1}`}
                    onClick={() => onShowImageModal(item)}
                  />
                </LazyLoad>
                <p>{item.benignOrMalignant.toUpperCase()}</p>
                <p>Anatomy site: {item.location}</p>
                {item.diagnosis !== "unknown" ? (
                  <p>Diagnosis: {item.diagnosis}</p>
                ) : null}
                <p>Approximate age: {item.age}</p>
                <p>Sex: {item.sex}</p>
              </GridItem>
            ))}
          </BottomRow>
        </ResultsContainer>
        {cachedRecords.includes(currentRecord) ? (
          <BottomButtonContainer>
            <OrangeButton onClick={() => setStage(STAGE_ITEMS.HOME)}>
              Return Home
            </OrangeButton>
          </BottomButtonContainer>
        ) : (
          <LeftRightButtonContainer>
            <OrangeButton onClick={onDiscard}>Discard</OrangeButton>
            <p>
              Click 'Save' to add to 'Records'. Click 'Discard' to create a new
              'Record'.
            </p>
            <OrangeButton onClick={onSave}>Save</OrangeButton>
          </LeftRightButtonContainer>
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
  width: 18rem;
  height: 100%;
  margin: auto;
  object-fit: cover;
  cursor: zoom-in;
`;

const ResultsContainer = styled.div`
  margin: 0 4rem;
  p {
    margin: 0.25rem;
  }
`;
