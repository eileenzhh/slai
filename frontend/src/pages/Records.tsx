import React, { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Title,
  OrangeButton,
  BottomButtonContainer,
} from "../commonStyles";
import Record from "../types/Record";
import PreviewCasesList from "../components/PreviewCasesList";
import styled from "styled-components";
import { useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";

interface RecordsProps {
  records: Record[];
  setRecords: Dispatch<SetStateAction<Record[]>>;
}

const Records: React.FC<RecordsProps> = ({ records, setRecords }) => {
  const setStage = useSetStage()
  const [showClearModal, setShowClearModal] = useState<boolean>(false);

  const onClear = () => {
    setShowClearModal(true);
  };

  const onCloseModal = () => {
    setShowClearModal(false);
  };

  const clearRecords = () => {
    setRecords([]);
  };

  const goToTakeImage = () => {
    setStage(STAGE_ITEMS.TAKE_IMAGE)
  }

  return (
    <Layout>
      <Title>Current Session</Title>
      <p>Records automatically get deleted after 10 minutes.</p>
      <MiddleButtonContainer>
        <OrangeButton onClick={onClear} disabled={records.length === 0}>
          Clear All Records
        </OrangeButton>
        <OrangeButton onClick={goToTakeImage}>
          Create New Record
        </OrangeButton>
      </MiddleButtonContainer>
      <PreviewCasesList
        records={records}
        showModal={showClearModal}
        clearRecords={clearRecords}
        closeModal={onCloseModal}
      />
    </Layout>
  );
};

export default Records;

const MiddleButtonContainer = styled(BottomButtonContainer)`
  justify-content: space-between;
`;
