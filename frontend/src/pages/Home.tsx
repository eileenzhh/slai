import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BottomButtonContainer, Layout, OrangeButton, Title } from '../commonStyles';
import { Link } from 'react-router-dom';
import PreviewCase from '../components/PreviewCase';
import dummyCase from '../types/DummyCase';
import Record from '../types/Record';
import { useSetStage } from '../app-context/stage-context';
import { STAGE_ITEMS } from '../constants';

const defaultValues: Pick<Record, 'date' | 'anatomySite' | 'exported'> = {
    date: 'March 4, 2024',
    anatomySite: 'Upper arm',
    exported: false,
  };

const Home = () => {
    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.HOME)
    }, [])

    const [records, setRecords] = useState<Record[]>(Object.entries(dummyCase).map(([id, caseData]) => {
        const record: Record ={
            id: parseInt(id, 10),
            image: caseData.image,
            retrievedRecords: (caseData as { cases?: string[] }).cases || [],
            ...defaultValues,
        }
        return record
    }))

    const onClear = () => {
        setRecords([])
    }

    return (
        <Layout>
            <Title>Current Session</Title>
            <p>Records automatically get deleted after 10 minutes.</p>
            <MiddleButtonContainer>
            <OrangeButton onClick={onClear}>Clear All Records</OrangeButton>
            <OrangeButton><Link to='/take-image'>Create New Record</Link></OrangeButton>
            </MiddleButtonContainer>
            <RecordsContainer>
                {records.map((record: Record) => (
                    <PreviewCase record={record}/>
                ))}
            </RecordsContainer>

        </Layout>
    )
}

export default Home

const RecordsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4rem; 
    margin: 0 2rem;
    justify-content: center;
`

const MiddleButtonContainer = styled(BottomButtonContainer)`
justify-content: space-between;
`