import React from "react";
import {
  BottomButtonContainer,
  Layout,
  OrangeButton,
  Title,
} from "../commonStyles";
import Breadcrumb from "../components/Breadcrumb";
import { useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import PreviewCase from "../components/PreviewCase";
import styled from "styled-components";
import Record from "../types/Record";
import { useCurrentRecord } from "../app-context/record-context";

const Export = () => {
  const setStage = useSetStage();
  const currentRecord = useCurrentRecord()
  const onNext = () => {
    setStage(STAGE_ITEMS.HOME);
  };

  const updatedRecord: Record = {
    ...currentRecord,
    saved: true,
  };
  return (
    <Layout>
      <Breadcrumb />
      <Title>Export your record</Title>
      The record has been saved!
      <PreviewContainer>
        <PreviewCase record={updatedRecord} />
      </PreviewContainer>
      <BottomButtonContainer>
        <OrangeButton onClick={onNext}>Return to home</OrangeButton>
      </BottomButtonContainer>
    </Layout>
  );
};

export default Export;

const PreviewContainer = styled.div`
  margin: 2rem;
  display: flex;
  justify-content: center;
`;
