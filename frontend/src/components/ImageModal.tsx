import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import LazyLoad from 'react-lazyload'

import { GreyOverlay } from "../commonStyles";
import { OverlayContainer, ModalContainer, CancelButton } from "./Modal";
import cancelButton from "../assets/cancel_button.png";

interface ImageModalProps {
    imageURl: string
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageURl, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <OverlayContainer>
        <GreyOverlay />
        <ImageModalContainer ref={modalRef}>
            <ModalHeaderContainer>
                <CancelButton src={cancelButton} onClick={onClose} />
            </ModalHeaderContainer>
            <LazyLoad once>
                <Image src={imageURl} />
            </LazyLoad>
        </ImageModalContainer>
      </OverlayContainer>
    )
}

export default ImageModal;

const ImageModalContainer = styled(ModalContainer)`
    width: 900px;
    max-height: calc(100vh - 64px - 68px);
`
const Image = styled.img`
    object-fit: cover;    
    width: 100%;
    max-height: calc(100vh - 64px - 68px - 21px - 64px);
`

const ModalHeaderContainer = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
`