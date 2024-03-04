import React from 'react';
import styled from 'styled-components';
import sample from '../assets/sample.png';

interface PreviewCaseProps {
    id?: string;
    image?: string;
    date?: string;
}

const PreviewCase: React.FC<PreviewCaseProps> = ({ id, image, date}) => {

    return (
        <Card>
            <p>Case {id}</p>
            <PreviewImage src={image ?? sample} alt='preview-image' />
            <DescriptionContainer>
                {date && <p>Date: {date}</p>}
            </DescriptionContainer>

        </Card>
    )
}

export default PreviewCase

const Card = styled.div`
    border: black solid;
    border-radius: 2rem;
    width: 375px;
    min-height: 225px;
    padding: 1rem 0;
`

const PreviewImage = styled.img<{src: string}>`
    object-fit: cover;
    width: 100%;
    height: 250px;
`

const DescriptionContainer = styled.div`
    text-align: left;
    margin: 0 1rem;
`