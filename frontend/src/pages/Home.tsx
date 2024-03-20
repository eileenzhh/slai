import React, { useEffect, useState } from "react";
import Record, { Case } from "../types/Record";
import { useCurrentStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import Records from "./Records";
import TakeImage from "./TakeImage";
import PreviewImage from "./PreviewImage";
import Results from "./Results";
import Export from "./Export";
import axios from "axios";
import getImageUrl from "../utils/getImageUrl";

const Home = () => {
  const currentStage = useCurrentStage();
  const [records, setRecords] = useState<Record[]>([]);

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
          filename: d["filename"],
          sex: d["sex"],
        }
        return currentCase

      })
      
      const record: Record = {
        image: image,
        cases: cases
      }
      allRecords.push(record)
    }
    setRecords(allRecords)
  }
  useEffect(() => {
    fetchAllCases()
  }, [])

  switch (currentStage) {
    case STAGE_ITEMS.HOME:
      return <Records records={records} setRecords={setRecords} />;
    case STAGE_ITEMS.TAKE_IMAGE:
      return <TakeImage />;
    case STAGE_ITEMS.SUBMIT_IMAGE:
      return <PreviewImage />;
    case STAGE_ITEMS.RESULTS:
      return <Results cachedRecords={records} />;
    case STAGE_ITEMS.EXPORT_RESULTS:
      return <Export />;
    default:
      return <div>Error</div>;
  }
};

export default Home;
