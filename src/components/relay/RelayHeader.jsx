import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../../assets/icons/arrow_back_white.svg";

const RelayHeader = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("nav:", location.state?.fromNewRelay);

  const handleBack = () => {
    if (location.state?.fromNewRelay) {
      navigate(-2); // uploadRelay, uploadTickle 스택 두개 삭제
    } else {
      navigate(-1);
    }
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>
        <img src={backIcon} alt="backIcon" />
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
  img {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export default RelayHeader;
