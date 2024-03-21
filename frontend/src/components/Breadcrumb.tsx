import React from "react";
import styled from "styled-components";
import orangeCircle from "../assets/orange_circle.png";
import arrow from '../assets/arrow.png';
import { useCurrentStage } from "../app-context/stage-context";
import { STAGE_ITEMS } from "../constants";

const Breadcrumb = () => {
  const items = Object.values(STAGE_ITEMS).filter(
    (item) => item !== STAGE_ITEMS.HOME
  );
  const currentStage = useCurrentStage();

  return (
    <BreadcrumbContainer>
      {items.map((item, index) => (
        <BreadcrumbItem key={index} active={item === currentStage}>
          <img src={orangeCircle} alt="Orange Circle" />
          <p>
            {item}
          </p>
          {index < items.length - 1 && <img src={arrow} alt="arrow"/>}
        </BreadcrumbItem>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;

const BreadcrumbItem = styled.div<{ active: boolean }>`
  margin-right: 1rem;
  color: ${(props) => (props.active ? "black" : "gray")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  display: flex;
  align-items: center;
  min-width: 200px;
  img {
    opacity: ${(props) => (props.active ? 1 : 0.7)};
    margin-right: 0.5rem;
    margin-left: 1rem;
  }
`;

const BreadcrumbContainer = styled.div`
  margin: 0 20rem 1rem;
  display: flex;
  justify-content: space-around;
`;
