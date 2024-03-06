import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetStage } from '../app-context/stage-context';
import Breadcrumb from '../components/Breadcrumb';
import { STAGE_ITEMS } from '../constants';
import { BottomButtonContainer, Layout, MiddleContainer, OrangeButton, RightOrangeButton, Title } from '../commonStyles';
import Loading from '../components/Loading';
import sample from '../assets/sample.png';
import { dummyRecord } from '../types/DummyCase';

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
                <p>Click 'Submit' to retrieve cases for this image.</p>
            <BottomButtonContainer>
                <OrangeButton onClick={onSubmit} disabled={loading}>Submit</OrangeButton>
            </BottomButtonContainer>
            </Layout>

        </div>
    )
}

export default PreviewImage
