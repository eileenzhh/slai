import React, { useState } from "react";
import { useSetStage } from "../app-context/stage-context";
import Breadcrumb from "../components/Breadcrumb";
import { STAGE_ITEMS } from "../constants";
import {
  OrangeButton,
  MiddleContainer,
  Title,
  MainImage,
  TwoColumnLayout,
  MiddleButtonContainer,
  BottomButtonContainer,
} from "../commonStyles";

import styled from "styled-components";
import Record from "../types/Record";
import axios from "axios";
import SmallCase from "../components/SmallCase";
import { useCurrentRecord } from "../app-context/record-context";
import ImageModal from "../components/ImageModal";

interface ResultsProps {
  cachedRecords: Record[];
}

const Results: React.FC<ResultsProps> = ({ cachedRecords }) => {
  const setStage = useSetStage();
  const currentRecord = useCurrentRecord();
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string>();

  const saveCurrentRecord = async () => {
    try {
      const response = await axios.post("http://localhost:5000/save", {});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    saveCurrentRecord();
    setStage(STAGE_ITEMS.EXPORT_RESULTS);
  };

  const onDiscard = async () => {
    await axios
      .post("http://localhost:5000/discard", {})
      .then((res) => {
        if (res.status === 200) {
          setStage(STAGE_ITEMS.SUBMIT_IMAGE);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onShowImageModal = (imageUrl: string) => {
    setSelectedImg(imageUrl);
    setShowImageModal(true);
  };

  return (
    <div>
      {showImageModal && selectedImg && (
        <ImageModal
          imageURl={selectedImg}
          onClose={() => setShowImageModal(false)}
        />
      )}
      <Breadcrumb />
      {cachedRecords.includes(currentRecord) ? (
        <Title>Results</Title>
      ) : (
        <MiddleButtonContainer>
          <OrangeButton onClick={onDiscard}>Discard</OrangeButton>
          <Title>Results</Title>
          <OrangeButton onClick={onSave}>Save</OrangeButton>
        </MiddleButtonContainer>
      )}
      <ResultTwoColumnLayout>
        <div>
          <MiddleContainer>
            <MainImageZoom src={currentRecord.image} onClick={() => onShowImageModal(currentRecord.image)} alt="preview" />
          </MiddleContainer>
          <p>
            {currentRecord.cases.length} cases were retrieved from this image.
            Click on the image to get a larger view.
          </p>
          {cachedRecords.includes(currentRecord) && (
            <BottomButtonContainer>
              <OrangeButton onClick={() => setStage(STAGE_ITEMS.HOME)}>
                Return Home
              </OrangeButton>
            </BottomButtonContainer>
          )}
        </div>
        <ResultsContainer>
          {currentRecord.cases.map((item, index) => {
            console.log(index);
            return (
              <SmallCase
                index={index + 1}
                caseRecord={item}
                showImageModal={onShowImageModal}
              />
            );
          })}
        </ResultsContainer>
      </ResultTwoColumnLayout>
    </div>
  );
};

export default Results;

const ResultsContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  border-radius: 1rem;
  padding: 0.5rem;
  margin-right: 1rem;
`;

const ResultTwoColumnLayout = styled(TwoColumnLayout)`
  margin: 0;
`;

const MainImageZoom = styled(MainImage)`
  cursor: zoom-in
`
