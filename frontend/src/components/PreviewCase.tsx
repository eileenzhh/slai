import React from "react";
import styled from "styled-components";
import Record from "../types/Record";
import { BottomButtonContainer, SmallOrangeButton } from "../commonStyles";
import { useCurrentStage, useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import { useSetRecord } from "../app-context/record-context";

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
      {currentStage === STAGE_ITEMS.EXPORT_RESULTS ? null : (
        <SmallBottomButtonContainer>
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
  margin-bottom: 1rem;
`;

const DescriptionContainer = styled.div`
  text-align: left;
  margin: 0 1rem;
`;

const SmallBottomButtonContainer = styled(BottomButtonContainer)`
  margin: 0 1rem 1rem;
`;
