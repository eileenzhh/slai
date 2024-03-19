import Record from "./Record";
import sample from "../assets/sample.png";
import sample1 from "../assets/sample1.png";
import sample2 from "../assets/sample2.png";

const dummyCase = {
  "1": {
    cases: [`${sample1}`, `${sample2}`],
    image: `${sample}`,
  },
  "2": {
    cases: [`${sample}`, `${sample2}`],
    image: `${sample1}`,
  },
  "3": {
    cases: [`${sample1}`, `${sample}`],
    image: `${sample2}`,
  },
};

export const dummyRecord: Record = {
  image: sample,
  cases: [],
};

export default dummyCase;
