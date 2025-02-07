import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/icons/arrow_back_black.svg"; // 아이콘 변경

const Header = ({ title, onNext, onComplete, buttonText }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>
        <BackIcon />
      </BackButton>
      <Title>{title}</Title>
      {buttonText && ( // 버튼 텍스트가 있을 경우에만 버튼을 렌더링
        <RightBtn
          onClick={buttonText === "완료" ? onComplete : onNext}
          buttonType={buttonText} // buttonText를 props로 전달
        >
          {buttonText}
        </RightBtn>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  max-width: 480px;
  padding: 16px 20px;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  align-self: center;
  z-index: 1000;
`;
const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const RightBtn = styled.button`
  background-color: ${({ buttonType }) =>
    buttonType === "완료" ? "#7fa3ff" : "#d1d1d1"};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: ${({ buttonType }) =>
      buttonType === "완료" ? "#5d87d8" : "#b3b3b3"}; /* hover 시 색상 변경 */
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }
`;

export default Header;
