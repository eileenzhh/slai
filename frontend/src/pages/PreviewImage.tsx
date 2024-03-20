import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSetStage } from "../app-context/stage-context";
import Breadcrumb from "../components/Breadcrumb";
import { STAGE_ITEMS } from "../constants";
import {
  Layout,
  Title,
} from "../commonStyles";
import Spinner from "../components/Spinner";
import styled from "styled-components";
import { useSetRecord } from "../app-context/record-context";
import { dummyRecord } from "../types/DummyCase";


const PreviewImage = ( ) => {
  const setStage = useSetStage();
  const [loading, setLoading] = useState<boolean>(true)
  const setNewRecord = useSetRecord();
  const isMountedRef = useRef(true);

  const fetchCase = async () => {
    try {
      const response = await axios.get('http://localhost:5000/case');
      if (response.data && Object.keys(response.data).length !== 0) {
        console.log(response.data);
        setLoading(false);
        setStage(STAGE_ITEMS.RESULTS);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCase();
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => {
      clearInterval(intervalId);
      isMountedRef.current = false;
    };
  }, []);

  const setDummyImage = () =>{
    setNewRecord(dummyRecord);
    setStage(STAGE_ITEMS.RESULTS);
  }

  return (
    <div>
      <Layout>
        <Breadcrumb />
        <Title>Retrieving Results</Title>
        <p>We are retrieving the image from the mobile app.</p>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
        <p>Please do not exit the page until your results are retrieved.</p>
        <button onClick={() => setDummyImage()}>Set dummy image for now</button>
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
