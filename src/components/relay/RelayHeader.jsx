import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RelayHeader = ({ title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>
        <BackText>{"<"}</BackText>
      </BackButton>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  padding: 30px 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 100;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const BackText = styled.span`
  color: white;
  font-size: 24px;
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

export default RelayHeader;
