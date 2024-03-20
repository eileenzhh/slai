import styled from "styled-components";

export const Layout = styled.div`
  margin: 0 0 4rem;
  text-align: center;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const OrangeButton = styled.div<{ disabled?: boolean }>`
  width: 200px;
  height: 75px;
  a {
    text-decoration: none;
  }
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? "unset" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: ${({ disabled }) => (disabled ? "var(--lightorange)" : "var(--orange)")};
  border-radius: 1rem;
  color: ${({ disabled }) => (disabled ? "grey" : "black")};
  padding: 0 1rem;
`;

export const SmallOrangeButton = styled(OrangeButton)`
  width: 100px;
  height: 42px;
  font-size: 18px;
  border-radius: 0.5rem;
`;

export const RightOrangeButton = styled(OrangeButton)`
  position: absolute;
  bottom: 4rem;
  right: 4rem;
`;

export const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2rem;
`;

export const LeftRightButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  align-items: center;
`;

export const MiddleContainer = styled.div`
  width: 444px;
  height: 420px;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const GreyOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--darkgrey);
  opacity: 0.5;
`;
