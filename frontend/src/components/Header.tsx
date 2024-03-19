import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/SLAI-logo.png";
import Modal from "./Modal";
import { useCurrentStage, useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";

const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const location = useLocation();
  const setStage = useSetStage()

  const { pathname, state } = location;
  useEffect(() => {
    setShowModal(false);
  }, []);

  const currentStage = useCurrentStage();

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onClickRecords = () => {
    if (currentStage !== STAGE_ITEMS.HOME) setShowModal(true);
  };

  const canShowModal = showModal && currentStage !== STAGE_ITEMS.HOME;
  const modalDescription =
    currentStage === STAGE_ITEMS.RESULTS && !state?.exported
      ? "You haven't exported this record yet. Are you sure you want to exit?"
      : currentStage === STAGE_ITEMS.SUBMIT_IMAGE
      ? "You haven't retrieved the results yet. Are you sure you want to exit?"
      : "Go back to home";

  return (
    <div>
      {pathname !== "/login" ? (
        <div>
          {canShowModal && (
            <Modal
              title={"Exit Record"}
              description={modalDescription}
              primaryAction={() => {
                setStage(STAGE_ITEMS.HOME)
                onCloseModal();
              }}
              secondaryAction={onCloseModal}
              onClose={onCloseModal}
            />
          )}

          <HeaderContainer>
            <LeftSide>
              <Logo src={logo} alt="Orange Circle" />
              <HeaderButton
                onClick={onClickRecords}
                active={currentStage === STAGE_ITEMS.HOME}
              >
                Records
              </HeaderButton>
            </LeftSide>
            <h3>User 1</h3>
          </HeaderContainer>
        </div>
      ) : null}
    </div>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 2rem;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
`;

const Logo = styled.img`
  height: 4rem;
`;

const HeaderButton = styled.h3<{ active: boolean }>`
  cursor: ${({ active }) => (active ? "default" : "pointer")};

  a {
    text-decoration: none;
    color: black;
  }

  &:hover {
    opacity: ${({ active }) => (active ? "1" : "0.75")};
  }
`;
