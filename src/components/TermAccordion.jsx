import React, { useState } from "react";
import styled from "styled-components";
import downIcon from "../assets/icons/arrow_down.svg";

const TermAccordion = ({ onAgreeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsAgreed(checked);
    onAgreeChange(checked); // 부모로 전달
  };

  return (
    <AccordionContainer>
      <TitleWrapper onClick={toggleAccordion}>
        <Title>🔒 개인정보 수집 및 이용 동의</Title>
        <DownIcon src={downIcon} alt="down icon" isOpen={isOpen} />
      </TitleWrapper>

      <ContentWrapper isOpen={isOpen}>
        <ul>
          <li>본 서비스는 사용자의 익명성을 보장합니다.</li>
          <li>개인 정보를 수집하지 않습니다.</li>
          <li>
            사용자는 서비스에서 제공하는 랜덤 이름과 프로필 사진을 수정할 수
            있습니다.
          </li>
          <li>
            단, 사용자가 입력한 이름·프로필 사진에 개인정보를 포함하지 않도록
            주의해야 합니다.
          </li>
          <li>사용자가 업로드한 사진만 공유됩니다.</li>
          <li>위치, IP 등은 기록되지 않습니다.</li>
          <li>서비스 이용을 위해 위 내용을 확인하였으며, 동의합니다.</li>
        </ul>
      </ContentWrapper>
      <CheckboxWrapper>
        <input
          type="checkbox"
          id="agreeCheckbox"
          checked={isAgreed}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="agreeCheckbox">동의합니다.</label>
      </CheckboxWrapper>
    </AccordionContainer>
  );
};

const AccordionContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  width: 80%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 0px auto 20px;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
`;

const DownIcon = styled.img`
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease;
  height: 24px;
  width: 24px;
`;

const ContentWrapper = styled.div`
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;

  font-size: 12px;
  color: white;
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  li {
    margin-bottom: 4px;
    line-height: 1.4;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  label {
    margin-left: 5px;
    font-size: 14px;
    color: white;
  }
`;

export default TermAccordion;
