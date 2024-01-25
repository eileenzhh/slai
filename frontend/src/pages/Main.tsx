import React from 'react';
import { Link } from 'react-router-dom';
import cameraIcon from '../assets/camera.png'
import styled from 'styled-components'

import Breadcrumb from '../components/Breadcrumb';
const breadcrumbItems = [
    { text: 'Take Image', active: true },
    { text: 'Submit Image', active: false },
    { text: 'Results', active: false },
    { text: 'View Results', active: false },
  ];

const Main = () => {
    return (
        <div>
            <Breadcrumb items={breadcrumbItems}/>
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
            
            <Link to='/preview-image'><Button>Next</Button></Link>
            
        </div>
    )
}

export default Main

const Layout = styled.div`
    margin: 4rem 0;
`

const Title = styled.h1`
    text-align: center
`
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

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    background-color: #FFB37B;
    border-radius: 1rem;
    position: absolute;
    bottom: 4rem;
    right: 4rem;
    width: 200px;
    height: 75px;
    a {
        text-decoration: none;
    }
    text-align: center;
`