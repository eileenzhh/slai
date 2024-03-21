import React, { useState } from "react";
import Record from "../types/Record";
import { useCurrentStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import Records from "./Records";
import TakeImage from "./TakeImage";
import PreviewImage from "./PreviewImage";
import Results from "./Results";
import Export from "./Export";

const Home = () => {
  const currentStage = useCurrentStage();
  const [records, setRecords] = useState<Record[]>([]);

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
