import React, { useCallback, useEffect, useState } from "react";
import Record, { Case } from "../types/Record";
import { useCurrentStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import Records from "./Records";
import TakeImage from "./TakeImage";
import PreviewImage from "./PreviewImage";
import Results from "./Results";
import Export from "./Export";
import { useCurrentRecord } from "../app-context/record-context";
import axios from "axios";
import getImageUrl from "../utils/getImageUrl";

const Home = () => {
  const currentStage = useCurrentStage();

  // TO DO: need to implement check on whether record has been expired or not

  const [records, setRecords] = useState<Record[]>([]);

  const fetchAllCases = async () => {
    const response = await axios.get('http://localhost:5000/cases')
    const data = response.data
    
    // console.log("DATA", data.length)
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      
      const image = getImageUrl(item["image"])
      const cases = item["cases"].map((d: any, index: number) => {
        // console.log(d)
        const currentCase: Case = {
          age: d["age_approx"],
          location: d["anatom_site_general_challenge"],
          benignOrMalignant: d["benign_malignant"],
          diagnosis: d["diagnosis"],
          filename: d["filename"],
          sex: d["sex"],
        }
        return currentCase

      })
      
      const record: Record = {
        image: image,
        cases: cases
      }
      setRecords((prev) => prev ? [record, ...prev] : [record])
    }
  }
  useEffect(() => {
    fetchAllCases()
  }, [])

  const newRecord = useCurrentRecord();

  const onComplete = useCallback(() => {
    setRecords((prev) => prev ? [newRecord, ...prev] : [newRecord])
  }, [newRecord]);

  switch (currentStage) {
    case STAGE_ITEMS.HOME:
      return <Records records={records} setRecords={setRecords} />;
    case STAGE_ITEMS.TAKE_IMAGE:
      return <TakeImage />;
    case STAGE_ITEMS.SUBMIT_IMAGE:
      return <PreviewImage currentRecord={newRecord} />;
    case STAGE_ITEMS.RESULTS:
      return <Results currentRecord={newRecord} saveRecord={onComplete} cachedRecords={records} />;
    case STAGE_ITEMS.EXPORT_RESULTS:
      return <Export currentRecord={newRecord} />;
    default:
      return <div>Error</div>;
  }
};

export default Home;
