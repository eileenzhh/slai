import React, { createContext, useContext, ReactNode, useState } from 'react';
import Record from '../types/Record';
import { Outlet } from 'react-router-dom';

interface RecordContextProps {
    currentRecord: Record;
    setRecord: (newRecord: Record) => void;
}

const RecordContext = createContext<RecordContextProps | undefined>(undefined);

interface RecordContextProviderProps {
    children: ReactNode;
}

const emptyRecord: Record = {
    id: 0,
    image: "",
    retrievedRecords: [],
    date: "",
    anatomySite: "",
    exported: false
}

export const RecordContextProvider: React.FC<RecordContextProviderProps> = ({ children }) => {
    const [currentRecord, setCurrentRecord] = useState<Record>(emptyRecord)

    const setRecord = (newRecord: Record) => {
        setCurrentRecord(newRecord);
    }

    return (
        <RecordContext.Provider value={{ currentRecord, setRecord }}>
            {children}
        </RecordContext.Provider>
    )
}

export const useCurrentRecord = (): Record => {
    const context = useContext(RecordContext);

    if (!context) {
        throw new Error('useCurrentRecord must be used within a RecordContextProvider');
    }

    return context.currentRecord;
}

export const useSetRecord = (): ((newRecord: Record) => void) => {
    const context = useContext(RecordContext);

    if (!context) {
        throw new Error('useSetRecord must be used within a RecordContextProvider');
    }

    return context.setRecord;
}

export const RecordContextLayout = () => {
    return <RecordContextProvider>
        <Outlet />
    </RecordContextProvider>
}