import React from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../../assets/icons/close.svg";

const RelayDescription = ({ description, isVisible, closeDescription }) => {
  return (
    <Container isVisible={isVisible}>
      <DescContainer isVisible={isVisible}>
        <p>{description}</p>
        <CloseButton onClick={closeDescription} />
      </DescContainer>
    </Container>
  );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
  width: 100%;
`;

const DescContainer = styled.div`
  box-sizing: border-box;
  width: 80%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px 10px 10px 20px;
  border-radius: 8px;
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.5s ease-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  word-break: break-word; /* 긴 단어 자동 줄바꿈 */
`;

const CloseButton = styled.button`
  background: url(${closeIcon}) no-repeat center;
  align-self: end;
  background-size: contain;
  width: 20px;
  height: 20px;
  border: none;
  cursor: pointer;
`;

export default RelayDescription;
