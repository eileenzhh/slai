import React from "react";
import styled from "styled-components";
import sample from "../assets/sample.png";
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

  return (
    <Card>
      <p>Record {record.id}</p>
      <PreviewImage src={record.image ?? sample} alt="preview-image" />
      <DescriptionContainer>
        {record.date && <p>Date: {record.date}</p>}
        <p>Anatomy Site: {record.anatomySite}</p>
        <p>{record.exported ? "Exported" : "Unsaved"}</p>
      </DescriptionContainer>
      {currentStage == STAGE_ITEMS.EXPORT_RESULTS ? null : (
        <SmallBottomButtonContainer>
          <SmallOrangeButton onClick={onClick}>details</SmallOrangeButton>
        </SmallBottomButtonContainer>
      )}
    </Card>
  );
};

export default PreviewCase;

const Card = styled.div`
  border: black solid;
  border-radius: 2rem;
  width: 375px;
  min-height: 225px;
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

const SmallBottomButtonContainer = styled(BottomButtonContainer)`
  margin: 1rem;
`;
