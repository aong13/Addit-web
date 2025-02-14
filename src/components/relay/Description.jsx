import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import descriptionIcon from "../../assets/icons/description.svg";
import closeIcon from "../../assets/icons/close.svg";

const Description = ({ description }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const closeDescription = () => {
    setIsVisible(false); // 닫기 버튼 클릭 시 설명창을 닫음
  };

  return (
    <Container>
      <ToggleButton onClick={toggleVisibility} />
      {isVisible && (
        <DescriptionText>
          {description}
          <CloseButton onClick={closeDescription} />
        </DescriptionText>
      )}
    </Container>
  );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
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
    transform: translateY(-50px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  position: relative; /* 부모 요소가 relative여야 자식 요소의 absolute가 정상 동작함 */
`;

const ToggleButton = styled.button`
  background: url(${descriptionIcon}) no-repeat center;
  background-size: contain;
  border: none;
  cursor: pointer;
  width: 30px; /* 버튼 크기 조정 */
  height: 30px;
`;

const DescriptionText = styled.p`
  position: fixed; /* 화면 기준으로 위치 설정 */
  top: 70px; /* 화면의 세로 위치 조정 */
  left: 50%; /* 화면의 가로 가운데 */
  transform: translateX(-50%); /* 정확한 중앙 위치 */
  padding: 20px;
  padding-bottom: 40px;
  background: #ffffff;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  color: #5f5959;
  width: 252px; /* 고정 너비 */
  white-space: pre-wrap; /* 텍스트 줄바꿈 허용 */
  word-wrap: break-word; /* 긴 단어가 넘치지 않도록 줄바꿈 */
  min-height: 12px; /* 최소 높이 설정 (필요 시 조정 가능) */
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: 10px; /* 위쪽 간격 */
  right: 10px; /* 오른쪽 간격 */
  background: url(${closeIcon}) no-repeat center; /* 닫기 아이콘 배경으로 설정 */
  background-size: contain;
  width: 20px; /* 아이콘 크기 */
  height: 20px;
  border: none;
  cursor: pointer;
`;

export default Description;
