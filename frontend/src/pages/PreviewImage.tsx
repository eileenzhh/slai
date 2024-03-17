import React, { useState } from "react";
import { useSetStage } from "../app-context/stage-context";
import Breadcrumb from "../components/Breadcrumb";
import { STAGE_ITEMS } from "../constants";
import {
  Layout,
  LeftRightButtonContainer,
  MiddleContainer,
  OrangeButton,
  Title,
} from "../commonStyles";
import Loading from "../components/Loading";
import Record from "../types/Record";
import Spinner from "../components/Spinner";

interface PreviewImageProps {
  currentRecord: Record;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ currentRecord }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const setStage = useSetStage();

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage(STAGE_ITEMS.RESULTS);
    }, 3000);
  };

  const onBack = () => {
    setStage(STAGE_ITEMS.TAKE_IMAGE);
  };

  return (
    <div>
      {loading && <Loading />}
      <Layout>
        <Breadcrumb />
        <Title>Retrieving Results</Title>
        <MiddleContainer>
          <Title>LOADING</Title>
          <Spinner />
        </MiddleContainer>
        <p>Please do not exit the page until your results are retrieved.</p>
        <LeftRightButtonContainer>
          <OrangeButton onClick={onBack} disabled={loading}>
            Back
          </OrangeButton>
          <OrangeButton onClick={onSubmit} disabled={loading}>
            Submit
          </OrangeButton>
        </LeftRightButtonContainer>
      </Layout>
    </div>
  );
};

export default PreviewImage;
