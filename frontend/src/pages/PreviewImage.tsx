import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSetStage } from "../app-context/stage-context";
import Breadcrumb from "../components/Breadcrumb";
import { STAGE_ITEMS } from "../constants";
import {
  Layout,
  Title,
} from "../commonStyles";
import Record from "../types/Record";
import Spinner from "../components/Spinner";
import styled from "styled-components";
import { useSetRecord } from "../app-context/record-context";

interface PreviewImageProps {
  currentRecord: Record;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ currentRecord }) => {
  const setStage = useSetStage();
  const [loading, setLoading] = useState<boolean>(true)
  // const setNewRecord = useSetRecord();

  const fetchCase = async () => {
    try {
      const response = await axios.get('http://localhost:5000/case')
      if (response.data && Object.keys(response.data).length !== 0) {
        console.log(response.data)
        // setNewRecord()
        setLoading(false)
        setStage(STAGE_ITEMS.RESULTS);
      } else {
        setTimeout(fetchCase, 2000)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchCase()
  }, [])

  return (
    <div>
      <Layout>
        <Breadcrumb />
        <Title>Retrieving Results</Title>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
        <p>Please do not exit the page until your results are retrieved.</p>
      </Layout>
    </div>
  );
};

export default PreviewImage;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  height: 420px;
`
