import React from 'react';
import styled from 'styled-components';
import orangeCircle from '../assets/orange_circle.png';

interface BreadcrumbProps {
  items: { text: string; active: boolean; }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => (
        <BreadcrumbItem key={index} active={item.active}>
          <img src={orangeCircle} alt="Orange Circle" />
          <div>
          {item.text}
          {index < items.length - 1 && ' > '}
          </div>
        </BreadcrumbItem>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;

const BreadcrumbItem = styled.span<{active: boolean}>`
  margin-right: 1rem;
  color: ${(props) => (props.active ? 'black' : 'gray')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  display: flex;
  align-items: center;

  img {
    opacity: ${(props) => (props.active ? 1 : 0.7)};
    margin-right: 0.5rem;
  }
`;

const BreadcrumbContainer = styled.div`
  margin: 28px 0;
  display: flex;
  justify-content: space-around;
`;
