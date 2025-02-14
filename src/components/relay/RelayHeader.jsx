import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../../assets/icons/arrow_back_white.svg";
import RelayDescription from "./RelayDescription";
import descriptionIcon from "../../assets/icons/description.svg";

const RelayHeader = ({ title, description }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

  const handleBack = () => {
    if (location.state?.fromUpload) {
      navigate(-3);
    } else {
      navigate("/home");
    }
  };

  const toggleDescriptionVisibility = () => {
    setDescriptionVisible((prev) => !prev);
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>
        <img src={backIcon} alt="backIcon" />
      </BackButton>
      <Title>{title}</Title>
      <ToggleButton onClick={toggleDescriptionVisibility} />
      <RelayDescription
        description={description}
        isVisible={isDescriptionVisible}
        closeDescription={() => setDescriptionVisible(false)}
      />
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
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.15) 40%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
  }
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`;

const ToggleButton = styled.button`
  background: url(${descriptionIcon}) no-repeat center;
  background-size: contain;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

export default RelayHeader;
