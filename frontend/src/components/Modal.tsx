import React from "react";
import styled from "styled-components";
import { GreyOverlay, SmallOrangeButton } from "../commonStyles";
import cancelButton from "../assets/cancel_button.png";

type ModalType = "Success" | "Error" | "Warning";

interface ModalProps {
  title?: string;
  description?: string;
  modalType?: ModalType;
  onClose: () => void;
  primaryAction?: () => void;
  secondaryAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  modalType,
  onClose,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <OverlayContainer>
      <GreyOverlay />
      <ModalContainer>
        <ModalHeaderContainer>
          <CancelButton src={cancelButton} onClick={onClose} />
        </ModalHeaderContainer>
        <h3>{title}</h3>
        {description}
        <ActionContainer>
          {primaryAction && (
            <SmallOrangeButton onClick={primaryAction}>OK</SmallOrangeButton>
          )}
          {secondaryAction && (
            <SecondaryActionButton onClick={secondaryAction}>
              Cancel
            </SecondaryActionButton>
          )}
        </ActionContainer>
      </ModalContainer>
    </OverlayContainer>
  );
};

export default Modal;

export const CancelButton = styled.img`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export const OverlayContainer = styled.div`
  position: relative;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  justify-content: center;
  text-align: center;
`;

export const ModalHeaderContainer = styled.div`
  position: absolute;
  right: 2rem;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 2rem;
`;

const SecondaryActionButton = styled(SmallOrangeButton)`
  background: var(--grey)
`
