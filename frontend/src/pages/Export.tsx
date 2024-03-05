import React, {useEffect, useState} from 'react';
import { BottomButtonContainer, Layout, MiddleContainer, OrangeButton, Title } from '../commonStyles';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useSetStage } from '../app-context/stage-context';
import { STAGE_ITEMS } from '../constants';
import PreviewCase from '../components/PreviewCase';
import styled from 'styled-components';
import { dummyRecord } from '../types/DummyCase';
import Record from '../types/Record';

interface ExportProps {
    record?: Record
}

const Export: React.FC<ExportProps> = ({record}) => {
    const navigate = useNavigate()
    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.EXPORT_RESULTS)
    }, [])

    const onNext = () => {
        navigate('/')
    }
    return (
        <Layout>
            <Breadcrumb/>
            <Title>Export your record</Title>
            The record has been saved!
            <PreviewContainer>
            <PreviewCase 
                record={dummyRecord}
            />
            </PreviewContainer>
            <BottomButtonContainer>
                <OrangeButton onClick={onNext}>Return to home</OrangeButton>
            </BottomButtonContainer>
        </Layout>
    )
}

export default Export

const PreviewContainer = styled.div`
    margin: 2rem;
    display: flex;    
    justify-content: center;
`