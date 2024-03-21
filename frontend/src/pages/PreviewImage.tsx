import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSetStage } from "../app-context/stage-context";
import Breadcrumb from "../components/Breadcrumb";
import { STAGE_ITEMS } from "../constants";
import { Layout, Title } from "../commonStyles";
import Spinner from "../components/Spinner";
import styled from "styled-components";
import { useSetRecord } from "../app-context/record-context";
import Record, { Case } from "../types/Record";
import getImageUrl from "../utils/getImageUrl";

const PreviewImage = () => {
  const setStage = useSetStage();
  const [loading, setLoading] = useState<boolean>(true);
  const setNewRecord = useSetRecord();
  const isMountedRef = useRef(true);

  const fetchCase = async () => {
    try {
      const response = await axios.get("http://localhost:5000/case");
      if (response.data && Object.keys(response.data).length !== 0) {
        const data = response.data;
        const image = getImageUrl(data["image"]);
        const newRecord: Record = {
          image: image,
          cases: data["cases"].map((d: any, index: number) => {
            const currentCase: Case = {
              age: d["age_approx"] ? d["age_approx"] : "unknown",
              location: d["anatom_site_general_challenge"] ? d["anatom_site_general_challenge"] : "unknown",
              benignOrMalignant: d["benign_malignant"],
              diagnosis: d["diagnosis"],
              filename: d["isic_id"],
              sex: d["sex"],
            };
            return currentCase;
          }),
        };
        setNewRecord(newRecord);
        setLoading(false);
        setStage(STAGE_ITEMS.RESULTS);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
`;
