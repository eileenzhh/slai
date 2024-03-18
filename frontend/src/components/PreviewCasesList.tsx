import React, { useState } from "react";
import Record from "../types/Record";
import PreviewCase from "../components/PreviewCase";
import Modal from "../components/Modal";

import styled from "styled-components";

interface PreviewCasesListProps {
  records: Record[];
  showModal: boolean;
  clearRecords: () => void;
  closeModal: () => void;
}

const PreviewCasesList: React.FC<PreviewCasesListProps> = ({
  records,
  showModal,
  clearRecords,
  closeModal,
}) => {
  return (
    <div>
      {showModal && records.length > 0 && (
        <Modal
          title={"Clear Results"}
          description={"Are you sure you want to clear all the results?"}
          primaryAction={() => {
            clearRecords();
            closeModal();
          }}
          secondaryAction={closeModal}
          onClose={closeModal}
        />
      )}

      {records.length === 0 && <p>You have no records. Create a new record.</p>}
      <RecordsContainer>
        <Row>
          {records.slice(0, 3).map((record: Record, index) => (
            <PreviewCase key={index} record={record} />
          ))}
        </Row>
        <Row>
          {records.slice(3, 6).map((record: Record, index) => (
            <PreviewCase key={index} record={record} />
          ))}
        </Row>
      </RecordsContainer>
    </div>
  );
};

export default PreviewCasesList;

const RecordsContainer = styled.div`
  display: grid;
  justify-content: center;
  margin: 0 1rem;
  gap: 2rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  justify-content: center;
`;
