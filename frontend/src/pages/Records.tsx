import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import {
  Layout,
  Title,
  OrangeButton,
  MiddleButtonContainer,
} from "../commonStyles";
import Record, { Case } from "../types/Record";
import PreviewCasesList from "../components/PreviewCasesList";
import { useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import Modal from "../components/Modal";
import getImageUrl from "../utils/getImageUrl";

interface RecordsProps {
  records: Record[];
  setRecords: Dispatch<SetStateAction<Record[]>>;
}

const Records: React.FC<RecordsProps> = ({ records, setRecords }) => {
  const setStage = useSetStage();
  const [showClearModal, setShowClearModal] = useState<boolean>(false);

  const fetchAllCases = async () => {
    const response = await axios.get('http://localhost:5000/cases')
    const data = response.data
    const allRecords = []
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      
      const image = getImageUrl(item["image"])
      const cases = item["cases"].map((d: any, index: number) => {
        const currentCase: Case = {
          age: d["age_approx"],
          location: d["anatom_site_general_challenge"],
          benignOrMalignant: d["benign_malignant"],
          diagnosis: d["diagnosis"],
          filename: d["isic_id"],
          sex: d["sex"],
        }
        return currentCase

      })
      
      const record: Record = {
        image: image,
        cases: cases
      }
      allRecords.unshift(record)
    }
    setRecords(allRecords)
  }
  useEffect(() => {
    fetchAllCases()
  }, [])

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
