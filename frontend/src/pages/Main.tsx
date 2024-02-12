import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cameraIcon from '../assets/camera.png'
import styled from 'styled-components'

import Breadcrumb from '../components/Breadcrumb';
import { STAGE_ITEMS, useSetStage } from '../app-context/stage-context';

import { Layout, OrangeButton, Title } from '../commonStyles';

const Main = () => {

    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.TAKE_IMAGE)
    }, [])
    return (
        <div>
            <Breadcrumb/>
            <Layout>
                <Title>Take Image</Title>
                <InstructionContainer>
                    <CameraIcon><img src={cameraIcon} alt="Camera Icon" /></CameraIcon>
                    <p>How to take a picture</p>
                    <ul>
                        <li>Connect mobile app</li>
                        <li>Make sure to have good lighting</li>
                    </ul>
                </InstructionContainer>
            </Layout>
            
            <Link to='/preview-image'><OrangeButton>Next</OrangeButton></Link>
            
        </div>
    )
}

export default Main

const CameraIcon = styled.div`
    display: flex;
    justify-content:center;
`

const InstructionContainer = styled.div`
    border: 1px solid #000;
    width: 444px;
    height: 420px;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
`
