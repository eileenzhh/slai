import React from "react";
import styled from "styled-components";
import LazyLoad from 'react-lazyload'

import { GreyOverlay } from "../commonStyles";
import { OverlayContainer, ModalContainer, CancelButton } from "./Modal";
import cancelButton from "../assets/cancel_button.png";
import { Case } from "../types/Record";

interface ImageModalProps {
    caseRecord: Case;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ caseRecord, onClose }) => {
    console.log(caseRecord)
    return (
        <OverlayContainer>
        <GreyOverlay />
        <ImageModalContainer>
            <ModalHeaderContainer>
                <CancelButton src={cancelButton} onClick={onClose} />
            </ModalHeaderContainer>
            <LazyLoad once>
                <Image src={`/ISIC_2020_Training_JPEG/${caseRecord.filename}`} />
            </LazyLoad>
        </ImageModalContainer>
      </OverlayContainer>
    )
}

export default ImageModal;

const ImageModalContainer = styled(ModalContainer)`
    width: 900px;
`
const Image = styled.img`
    
    width: 100% 
`

const ModalHeaderContainer = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
`