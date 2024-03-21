import React from "react";
import styled from "styled-components";
import Record from "../types/Record";
import { BottomButtonContainer, LeftRightButtonContainer, SmallOrangeButton } from "../commonStyles";
import { useCurrentStage, useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import { useSetRecord } from "../app-context/record-context";
import upload from '../assets/check.png'

interface PreviewCaseProps {
  record: Record;
}

const PreviewCase: React.FC<PreviewCaseProps> = ({ record }) => {
  const currentStage = useCurrentStage();

  const setStage = useSetStage();
  const setRecord = useSetRecord()

  const onClick = () => {
    setRecord(record)
    setStage(STAGE_ITEMS.RESULTS);
  };

  // TO DO: show previews of the cases...?

  return (
    <Card>
      <p>Record</p>
      <PreviewImage src={record.image} alt="preview-image" />
      {currentStage === STAGE_ITEMS.EXPORT_RESULTS ? (
        <SavedContainer>
          <CheckIcon src={upload} alt='check'/>
          <p>Saved</p>
        </SavedContainer>
      ) : (
        <SmallBottomButtonContainer>
          <p>{record.cases.length} cases retrieved from this record</p>
          <SmallOrangeButton onClick={onClick}>See Details</SmallOrangeButton>
        </SmallBottomButtonContainer>
      )}
    </Card>
  );
};

export default PreviewCase;

const Card = styled.div`
  border: var(--lightgrey) solid;
  border-radius: 2rem;
  width: 375px;
  min-height: 225px;
  box-shadow: 0px 0px 10px 5px var(--lightgrey);
`;

const PreviewImage = styled.img<{ src: string }>`
  object-fit: cover;
  width: 100%;
  height: 250px;
`;

const DescriptionContainer = styled.div`
  text-align: left;
  margin: 0 1rem;
`;

const SmallBottomButtonContainer = styled(LeftRightButtonContainer)`
  margin: 0 1rem 1rem;
  p {
    text-align: left
  }
  align-items: center;
`;

const SavedContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`

const CheckIcon = styled.img`
  height: 24px;
  width: 24px;
`
