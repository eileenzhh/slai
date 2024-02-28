import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cameraIcon from '../assets/camera.png'
import styled from 'styled-components'

import Breadcrumb from '../components/Breadcrumb';
import { useSetStage } from '../app-context/stage-context';
import { STAGE_ITEMS } from '../constants';

import { Layout, RightOrangeButton, Title, MiddleContainer } from '../commonStyles';
import Loading from '../components/Loading';

const TakeImage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.TAKE_IMAGE)
    }, [])

    const onSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate('/preview-image')
        }, 3000)
    }

    return (
        <div>
            {loading && <Loading />}
            <Breadcrumb/>
            <Layout>
                <Title>Take Image</Title>
                <MiddleContainer>
                    <CameraIcon><img src={cameraIcon} alt="Camera Icon" /></CameraIcon>
                    <Instructions>
                    <p>How to take a picture</p>
                    <ul>
                        <li>Connect mobile app</li>
                        <li>Make sure to have good lighting</li>
                    </ul>
                    </Instructions>
                </MiddleContainer>
            </Layout>
            
            <RightOrangeButton disabled={loading} onClick={onSubmit}>Next</RightOrangeButton>
            
        </div>
    )
}

export default TakeImage

const CameraIcon = styled.div`
    display: flex;
    justify-content:center;
`

const Instructions = styled.div`
    
    text-align: left;
`