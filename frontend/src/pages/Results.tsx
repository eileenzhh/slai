import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetStage } from '../app-context/stage-context';
import Breadcrumb from '../components/Breadcrumb';
import { STAGE_ITEMS } from '../constants';
import { Layout, BottomButtonContainer, OrangeButton, MiddleContainer, Title } from '../commonStyles';
import sample from '../assets/sample.png';
import sample1 from '../assets/sample1.png';
import sample2 from '../assets/sample2.png';
import empty from '../assets/empty.png';

import styled from 'styled-components';

const Results = () => {
    const result = [sample1, sample2, empty, empty, empty]
    const navigate = useNavigate()
    const setStage = useSetStage()
    useEffect(() => {
        setStage(STAGE_ITEMS.RESULTS)
    }, [])

    const [loading, setLoading] = useState<boolean>(false)

    const onNext = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate('/results')
        }, 3000)
    }

    return (
        <div>
            <Breadcrumb/>
            <Layout>
                <Title>Cases Retrieved</Title>
                <MiddleContainer>
                    <img src={sample} alt="preview image"/>
                </MiddleContainer>
                <p>Preview image</p>
                <ResultsContainer>
                <TopRow>
                    {result.slice(0,3).map((item, index) => (
                        <GridItem key={index}>
                            <h3>{`Result: ${index + 1}`}</h3>
                            <Image src={item} alt={`Image ${index + 1}`} />
                            <p>image description</p>
                        </GridItem>
                    ))}
                </TopRow>
                <BottomRow>
                    {result.slice(3,5).map((item, index) => (
                        <GridItem key={index}>
                            <h3>{`Result: ${index + 4}`}</h3>
                            <Image src={item} alt={`Image ${index + 4}`} />
                            <p>image description</p>
                        </GridItem>
                    ))}
                </BottomRow>
                </ResultsContainer>
                <BottomButtonContainer>
                <OrangeButton onClick={onNext}>Next</OrangeButton>
            </BottomButtonContainer>
            </Layout>
            

        </div>
    )
}

export default Results

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns for the top row */
  gap: 16px; /* Adjust the gap between images as needed */
`;

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled(GridContainer)`
  grid-template-rows: 1fr; /* Only one row for the top row */
`;

const BottomRow = styled(GridContainer)`
  grid-template-columns: repeat(2, 1fr); /* Two columns for the bottom row */
`;

const Image = styled.img`
  width: 12rem;
  height: 100%;
  margin: auto;
  object-fit: cover;
`;

const ResultsContainer = styled.div`
    margin: 0 4rem;
`
