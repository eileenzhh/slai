import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import sample from "../assets/sample.png";
import { dummyRecord } from "../types/DummyCase";
import Record from "../types/Record";

interface PreviewImageProps {
  currentRecord: Record;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ currentRecord }) => {
  const [loading, setLoading] = useState<boolean>(false);
  // const navigate = useNavigate();

  const setStage = useSetStage();
  // useEffect(() => {
  //   setStage(STAGE_ITEMS.SUBMIT_IMAGE);
  // }, []);

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // navigate("/results", { state: dummyRecord });
      setStage(STAGE_ITEMS.RESULTS)
    }, 3000);
  };

  const onBack = () => {
    setStage(STAGE_ITEMS.TAKE_IMAGE)
  };


  return (
    <div>
      {loading && <Loading />}
      <Layout>
        <Breadcrumb />
        <Title>Submit Image</Title>
        <p>Verify you would like to proceed with this image.</p>
        <MiddleContainer>
          <img src={currentRecord.image} alt="preview image" />
        </MiddleContainer>
        <p>Click 'Back' to retake your image.</p>
        <p>Click 'Submit' to retrieve cases for this image.</p>
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
