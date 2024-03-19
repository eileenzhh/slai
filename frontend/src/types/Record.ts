type Record = {
    image: string;
    cases: Case[];
    saved?: boolean;
}

export type Case = {
    age: number;
    location: string;
    benignOrMalignant: 'benign' | 'malignant';
    diagnosis: string;
    filename: string;
    sex: string; 
}

export default Record;