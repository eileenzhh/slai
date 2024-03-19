import React, { useCallback } from "react";
import styled from "styled-components";
import logo from "../assets/SLAI-logo-white.png";
import { SmallOrangeButton, Title } from "../commonStyles";
import { useSetStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const setStage = useSetStage()

  const navigate = useNavigate();
  const onLogin = useCallback(() => {
    setStage(STAGE_ITEMS.HOME)
    navigate('/')
  }, [])

  return (
    <LoginPageContainer>
      <LeftContainer>
        <Logo src={logo} />
      </LeftContainer>
      <RightContainer>
        <Title>Login</Title>
        <LoginForm>
          <label>Email</label>
          <input type="text" placeholder="Email" />
          <label>Password</label>
          <input type="text" placeholder="Password" />
        </LoginForm>
        <SmallOrangeButton onClick={onLogin}>Login</SmallOrangeButton>
      </RightContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;

const LoginPageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const Logo = styled.img`
  // height: 24rem;
`;

const LeftContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  background-color: var(--orange);
  width: 67%;
`;

const RightContainer = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 2rem 0;
`;
