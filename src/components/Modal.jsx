import React from "react";
import styled, { keyframes } from "styled-components";
import useModalStore from "../store/useModalStore";
import logo from "../assets/logo_white.svg";
import goIcon from "../assets/icons/arrow_box.svg";
import useToastStore from "../store/useToastStore";

const Menu = ({ content, color, onClick }) => {
  return (
    <MenuContainer color={color} onClick={onClick}>
      {content}
      <img src={goIcon} alt="icon" />
    </MenuContainer>
  );
};

const Modal = () => {
  const { isOpen, closeModal } = useModalStore();
  const addToast = useToastStore((state) => state.addToast);

  if (!isOpen) return null;

  const copyToClipboard = (url) => {
    const textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    addToast("URL이 클립보드에 복사되었습니다!"); // 버튼 클릭 시에만 Toast 뜸
  };

  return (
    <Overlay onClick={closeModal}>
      <Text>★★★★★</Text>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
          marginTop: "10px",
          marginBottom: "6px",
        }}
      >
        <img src={logo} style={{ width: "80px" }} alt="logo" />
        <Text> 은 어떠셨나요</Text>
      </div>
      <TextGray>여러분들의 소중한 의견이 필요합니다.</TextGray>

      <Menu content="설문 참여해주기" color="#7FA3FF" />
      <Menu content="사전예약 신청하기" color="#C8D8FF" />
      <Menu
        content="공유링크 복사하기"
        color="#FFF08F"
        onClick={() => copyToClipboard(window.location.href)}
      />
    </Overlay>
  );
};

export default Modal;

// 애니메이션
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
`;

const MenuContainer = styled.div`
  background: ${({ color }) => color || "white"};
  padding: 16px 20px;
  border-radius: 10px;
  min-width: 300px;
  cursor: pointer;
  font-weight: 600;
  color: #545454;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }
  &:hover {
    filter: brightness(0.6);
  }
`;

const Text = styled.h1`
  color: white;
`;

const TextGray = styled.p`
  color: #cacaca;
  font-size: 10px;
  margin-bottom: 34px;
`;
