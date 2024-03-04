import React from 'react';
import styled from 'styled-components';
import { BottomButtonContainer, Layout, OrangeButton, Title } from '../commonStyles';
import { Link } from 'react-router-dom';
import PreviewCase from '../components/PreviewCase';
import sample from '../assets/sample.png';

const Home = () => {
    const dummyCases = {
        "1": {
            "cases": [
                "/static/images/ISIC_0015719.jpg",
                "/static/images/ISIC_0052212.jpg"
            ],
            "image": "byte_data"
        },
        "2": {
            "cases": [
                "/static/images/ISIC_0015719.jpg",
                "/static/images/ISIC_0052212.jpg"
            ],
            "image": "byte_data"
        }
    }
    
    return (
        <Layout>
            <Title>My Records</Title>
            <RecordsContainer>
                <PreviewCase id={"1"} image={sample} date={"March 4, 2024"} />
                <PreviewCase id={"2"} image={sample} date={"February 29, 2024"}/>
                <PreviewCase id={"3"} image={sample}/>
            </RecordsContainer>
            <BottomButtonContainer>
            <OrangeButton><Link to='/take-image'>Create New Record</Link></OrangeButton>
            </BottomButtonContainer>
        </Layout>
    )
}

export default Home

const RecordsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem; 
    margin: 0 2rem;
`