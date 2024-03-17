import React, { useCallback, useEffect, useState } from "react";
import dummyCase from "../types/DummyCase";
import Record from "../types/Record";
import { useCurrentStage, useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import Records from "./Records";
import TakeImage from "./TakeImage";
import PreviewImage from "./PreviewImage";
import Results from "./Results";
import Export from "./Export";

// const defaultValues: Pick<Record, 'date' | 'anatomySite' | 'exported'> = {
//     date: 'March 4, 2024',
//     anatomySite: 'Upper arm',
//     exported: false,
//   };

const Home = () => {
  const currentStage = useCurrentStage();

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

  const [newRecord, setNewRecord] = useState<Record>({
    id: 0,
    image: "",
    retrievedRecords: [],
    date: "",
    anatomySite: "",
    exported: false
  })

  const onComplete = useCallback(() => {
    setRecords((prevRecords) => [...prevRecords, newRecord])
  }, [newRecord])

  switch (currentStage) {
    case STAGE_ITEMS.HOME:
      return <Records records={records} setRecords={setRecords} />;
    case STAGE_ITEMS.TAKE_IMAGE:
      return <TakeImage setNewRecord={setNewRecord}/>
    case STAGE_ITEMS.SUBMIT_IMAGE:
      return <PreviewImage currentRecord={newRecord}/>
    case STAGE_ITEMS.RESULTS:
      return <Results currentRecord={newRecord} saveRecord={onComplete}/>
    case STAGE_ITEMS.EXPORT_RESULTS:
      return <Export currentRecord={newRecord}/>
    default:
      return <div>Error</div>
  }
};

export default Home;

