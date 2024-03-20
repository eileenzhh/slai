import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
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
import Modal from "../components/Modal";

interface RecordsProps {
  records: Record[];
  setRecords: Dispatch<SetStateAction<Record[]>>;
}

const Records: React.FC<RecordsProps> = ({ records, setRecords }) => {
  const setStage = useSetStage();
  const [showClearModal, setShowClearModal] = useState<boolean>(false);

  const onClear = () => {
    setShowClearModal(true);
  };

  const onCloseModal = () => {
    setShowClearModal(false);
  };

  const clearRecords = async () => {
    try {
      const response = await axios.post("http://localhost:5000/clear", {});
      console.log("Cleared!", response);
    } catch (err) {
      console.log("there was an error");
    }
    setRecords([]);
  };

  const goToTakeImage = () => {
    setStage(STAGE_ITEMS.TAKE_IMAGE);
  };

  return (
    <div>
      {showClearModal && records.length > 0 && (
        <Modal
          title={"Clear Results"}
          description={"Are you sure you want to clear all the results?"}
          primaryAction={() => {
            clearRecords();
            onCloseModal();
          }}
          secondaryAction={onCloseModal}
          onClose={onCloseModal}
        />
      )}
      <Layout>
        <MiddleButtonContainer>
          <OrangeButton onClick={onClear} disabled={records.length === 0}>
            Clear All Records
          </OrangeButton>
          <div>
            <Title>Current Session</Title>
            <p>Records automatically get deleted after 10 minutes.</p>
          </div>
          <OrangeButton onClick={goToTakeImage}>Create New Record</OrangeButton>
        </MiddleButtonContainer>
        <PreviewCasesList records={records} />
      </Layout>
    </div>
  );
};

export default Records;

const MiddleButtonContainer = styled(BottomButtonContainer)`
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
  }
  p {
    margin-bottom: 0;
  }
`;
