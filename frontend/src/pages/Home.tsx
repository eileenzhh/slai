import React, { useCallback, useState } from "react";
import dummyCase from "../types/DummyCase";
import Record from "../types/Record";
import { useCurrentStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import Records from "./Records";
import TakeImage from "./TakeImage";
import PreviewImage from "./PreviewImage";
import Results from "./Results";
import Export from "./Export";
import { useCurrentRecord } from "../app-context/record-context";

const Home = () => {
  const currentStage = useCurrentStage();

  // TO DO: need to implement check on whether record has been expired or not
  
  // TO DO: move setting records logic to `Records`
  const [records, setRecords] = useState<Record[]>(
    Object.entries(dummyCase).map(([id, caseData]) => {
      const record: Record = {
        id: parseInt(id, 10),
        image: caseData.image,
        retrievedRecords: (caseData as { cases?: string[] }).cases || [],
        date: id === "3" ? "March 4, 2024" : "March 5, 2024",
        anatomySite: id === "1" ? "Upper arm" : "Thigh",
        exported: id === "1" ? false : true,
      };
      return record;
    })
  );

  const newRecord = useCurrentRecord();

  const onComplete = useCallback(() => {
    setRecords((prevRecords) => [...prevRecords, newRecord]);
  }, [newRecord]);

  switch (currentStage) {
    case STAGE_ITEMS.HOME:
      return <Records records={records} setRecords={setRecords} />;
    case STAGE_ITEMS.TAKE_IMAGE:
      return <TakeImage />;
    case STAGE_ITEMS.SUBMIT_IMAGE:
      return <PreviewImage currentRecord={newRecord} />;
    case STAGE_ITEMS.RESULTS:
      return <Results currentRecord={newRecord} saveRecord={onComplete} />;
    case STAGE_ITEMS.EXPORT_RESULTS:
      return <Export currentRecord={newRecord} />;
    default:
      return <div>Error</div>;
  }
};

export default Home;
