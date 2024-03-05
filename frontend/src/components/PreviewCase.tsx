import React from 'react';
import styled from 'styled-components';
import sample from '../assets/sample.png';
import Record from '../types/Record';

interface PreviewCaseProps {
    id?: string;
    image?: string;
    date?: string;
    record: Record;
}

const PreviewCase: React.FC<PreviewCaseProps> = ({ id, image, date, record}) => {

    return (
        <Card>
            <p>Record {record.id}</p>
            <PreviewImage src={record.image ?? sample} alt='preview-image' />
            <DescriptionContainer>
                {record.date && <p>Date: {record.date}</p>}
                <p>Anatomy Site: {record.anatomySite}</p>
                {record.exported ?? <p>Exported</p>}
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