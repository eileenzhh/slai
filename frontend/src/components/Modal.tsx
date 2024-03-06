import React from 'react';
import styled from 'styled-components';
import { GreyOverlay, SmallOrangeButton } from '../commonStyles';
import cancelButton from '../assets/cancel_button.png';

type ModalType = 'Success' | 'Error' | 'Warning';

interface ModalProps {
    title?: string;
    description?: string;
    modalType?: ModalType;
    onClose: () => void;
    primaryAction?: () => void;
    secondaryAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, description, modalType,onClose , primaryAction, secondaryAction }) => {
    return (
        <OverlayContainer>
            <GreyOverlay />
            <ModalContainer>
                <HeaderContainer>
                    <CancelButton src={cancelButton} onClick={onClose} />
                </HeaderContainer>
                <h3>{title}</h3>
                {description}
                <ActionContainer>
                    {primaryAction && <SmallOrangeButton onClick={primaryAction}>OK</SmallOrangeButton>}
                    {secondaryAction && <SmallOrangeButton onClick={secondaryAction}>Cancel</SmallOrangeButton>}
                </ActionContainer>
            </ModalContainer>
        </OverlayContainer>
    )
}

export default Modal

const CancelButton = styled.img`
    cursor: pointer;
    &:hover {
        opacity: 0.5
    }
`

const OverlayContainer = styled.div`
    position: relative;
    z-index: 1000;
`

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 2rem;
    padding: 2rem;
    justify-content: center;
    text-align: center;
`

const HeaderContainer = styled.div`
    position: absolute;
    right: 2rem;
`

const ActionContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 2rem;
`