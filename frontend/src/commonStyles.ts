import styled from "styled-components";

export const Layout = styled.div`
  text-align: center;
  height: calc(100vh - 75px);
`;

export const TwoColumnLayout = styled(Layout)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: calc(100vh - 64px - 38px - 42px - 32px);
  overflow: hidden;
`;

export const Title = styled.h1`
  text-align: center;
  margin-top: 0;
`;

export const OrangeButton = styled.div<{ disabled?: boolean }>`
  min-width: 100px;
  height: 42px;
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
  justify-content: flex-start;
  margin: 0 2rem 1rem;
`;

export const LeftRightButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 2rem 2rem;
  align-items: center;
`;

export const MiddleContainer = styled.div`
  width: 444px;
  height: 420px;
  margin: auto;
  display: flex;
  justify-content: censper;
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

export const MainImage = styled.img<{ src:string }>`
  max-height: 420px;
  object-fit: cover;
  border-radius: 1rem;
`

export const MiddleButtonContainer = styled(BottomButtonContainer)`
justify-content: space-between;
align-items: center;

h1 {
  margin: 0;
}
p {
  margin-bottom: 0;
}
`;

