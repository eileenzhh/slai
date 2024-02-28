import React from 'react';
import styled from 'styled-components';
import { OrangeButton } from '../commonStyles';
import { Link } from 'react-router-dom';

const Home = () => {
    
    return (
        <CaseContainer>
            <RecordsContainer>
            <h3>My Records</h3>
            </RecordsContainer>
            <OrangeButton><Link to='/take-image'>Start process</Link></OrangeButton>
        </CaseContainer>
    )
}

export default Home

const CaseContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const RecordsContainer = styled.div`
    
`