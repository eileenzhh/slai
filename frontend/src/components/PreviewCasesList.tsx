import React from "react";
import Record from "../types/Record";
import PreviewCase from "../components/PreviewCase";

import styled from "styled-components";

interface PreviewCasesListProps {
  records: Record[];
}

const PreviewCasesList: React.FC<PreviewCasesListProps> = ({ records }) => {
  return (
    <div>
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
