import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BottomButtonContainer, Layout, OrangeButton, Title } from '../commonStyles';
import { Link } from 'react-router-dom';
import PreviewCase from '../components/PreviewCase';
import dummyCase from '../types/DummyCase';
import Record from '../types/Record';
import { useSetStage } from '../app-context/stage-context';
import { STAGE_ITEMS } from '../constants';
import Modal from '../components/Modal';

// const defaultValues: Pick<Record, 'date' | 'anatomySite' | 'exported'> = {
//     date: 'March 4, 2024',
//     anatomySite: 'Upper arm',
//     exported: false,
//   };

const Home = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.HOME)
    }, [])

    const [records, setRecords] = useState<Record[]>(Object.entries(dummyCase).map(([id, caseData]) => {
        const record: Record ={
            id: parseInt(id, 10),
            image: caseData.image,
            retrievedRecords: (caseData as { cases?: string[] }).cases || [],
            date: id === "3" ? "March 4, 2024" : "March 5, 2024",
            anatomySite: id === "1" ? "Upper arm" : "Thigh",
            exported: id === "1" ? false : true,
        }
        return record
    }))

    const onClear = () => {
        setShowModal(true)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        
        <Layout>
            {showModal && records.length > 0 && 
                <Modal 
                    title={"Clear Results"} 
                    description={"Are you sure you want to clear all the results?"} 
                    primaryAction={() => {
                        setRecords([])
                        onCloseModal()
                    }}
                    secondaryAction={onCloseModal}
                    onClose={onCloseModal}
            />}
            <Title>Current Session</Title>
            <p>Records automatically get deleted after 10 minutes.</p>
            <MiddleButtonContainer>
            <OrangeButton onClick={onClear} disabled={records.length === 0}>Clear All Records</OrangeButton>
            <OrangeButton><Link to='/take-image'>Create New Record</Link></OrangeButton>
            </MiddleButtonContainer>
            {records.length === 0 && <p>You have no records. Create a new record.</p>}
            <RecordsContainer>
                {records.map((record: Record, index) => (
                    <PreviewCase key={index} record={record}/>
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