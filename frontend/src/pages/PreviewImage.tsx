import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetStage } from '../app-context/stage-context';
import Breadcrumb from '../components/Breadcrumb';
import { STAGE_ITEMS } from '../constants';
import { BottomButtonContainer, Layout, LeftRightButtonContainer, MiddleContainer, OrangeButton, RightOrangeButton, Title } from '../commonStyles';
import Loading from '../components/Loading';
import sample from '../assets/sample.png';
import { dummyRecord } from '../types/DummyCase';
import styled from 'styled-components'

const PreviewImage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.SUBMIT_IMAGE)
    }, [])

    const onSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate('/results',  { state : dummyRecord })
        }, 3000)
    }

    const onBack = () => {
        navigate('/take-image')

    }

    return (
        <div>
            {loading && <Loading />}
            <Layout>
            <Breadcrumb/>
                <Title>Submit Image</Title>
                <p>Verify you would like to proceed with this image.</p>
                <MiddleContainer>
                    <img src={sample} alt="preview image"/>
                </MiddleContainer>
                <p>Click 'Back' to retake your image.</p>
                <p>Click 'Submit' to retrieve cases for this image.</p>
            <LeftRightButtonContainer>
                <OrangeButton onClick={onBack} disabled={loading}>Back</OrangeButton>
                <OrangeButton onClick={onSubmit} disabled={loading}>Submit</OrangeButton>
            </LeftRightButtonContainer>
            </Layout>

        </div>
    )
}

export default PreviewImage
