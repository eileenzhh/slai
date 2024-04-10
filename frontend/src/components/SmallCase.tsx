import React from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";

import { Case } from "../types/Record";

interface SmallCaseProps {
  index: number;
  caseRecord: Case;
  showImageModal: (image: string) => void;
}

const SmallCase: React.FC<SmallCaseProps> = ({ index, caseRecord, showImageModal }) => {
    return (
    <CaseContainer>
      <ImageContainer>
        <LazyLoad offset={1000}>
          <Image
            src={`/ISIC_2020_Training_JPEG/${caseRecord.filename}`}
            alt={`Image-${index}`}
            onClick={() => showImageModal(`/ISIC_2020_Training_JPEG/${caseRecord.filename}`)}
          />
        </LazyLoad>
      </ImageContainer>
      <TextContainer>
      <h3>{`Result ${index}`}</h3>
        <p>{caseRecord.benignOrMalignant.toUpperCase()}</p>
        <p>Anatomy site: {caseRecord.location}</p>
        <p>Diagnosis: {caseRecord.diagnosis}</p>
        <p>Approximate age: {caseRecord.age ?? "unknown"}</p>
        <p>Sex: {caseRecord.sex}</p>
      </TextContainer>
    </CaseContainer>
  );
};

export default SmallCase;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
`

const Image = styled.img`
  max-width: 18rem;
  height: 15rem;
  margin: auto;
  object-fit: cover;
  cursor: zoom-in;
  border-radius: 1rem 0 0 1rem;
`;

const CaseContainer = styled.div`
  display: flex;
  gap: 2rem;
  h3 {
    margin: 0 0 0.5rem;
  }
  border: var(--lightgrey) solid;
  border-radius: 1rem;
  height: 15rem;
  box-shadow: 0px 0px 10px 5px var(--lightgrey);
  margin-bottom: 1rem;
`;

const TextContainer = styled.div`
  text-align: left;
  margin-top: 1rem;
  p {
    margin: 0 0 0.5rem;
  }
`;
