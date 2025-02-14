import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useModalStore from "../store/useModalStore";
import logo from "../assets/logo_white.svg";
import goIcon from "../assets/icons/arrow_box.svg";
import useToastStore from "../store/useToastStore";
import { handleRedirect } from "../utils/redirect";

const Menu = ({ content, color, onClick }) => (
  <MenuContainer color={color} onClick={onClick}>
    {content}
    <img src={goIcon} alt="icon" />
  </MenuContainer>
);

const Modal = () => {
  const addToast = useToastStore((state) => state.addToast);
  const { isOpen, closeModal } = useModalStore();
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsModalActive(true);
      const timer = setTimeout(() => setIsModalActive(false), 1000); //1초
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("URL이 클립보드에 복사되었습니다!");
  };

  const menuItems = [
    {
      content: "설문 참여해주기",
      color: "#7FA3FF",
      onclick: () =>
        handleRedirect(
          "https://docs.google.com/forms/d/15_bHgcSYlwX-Ea7J7EjP6YErvB1S2H9PJSxOC2hrikg/edit"
        ),
    },
    {
      content: "사전예약 신청하기",
      color: "#C8D8FF",
      onclick: () =>
        handleRedirect(
          "https://docs.google.com/forms/d/1OtuYbJGoAlU44sendN5Auym8F04VhF0TrBbN6QDeW9U/edit"
        ),
    },
    {
      content: "문의하기",
      color: "#FFF08F",
      onclick: () => handleRedirect("http://pf.kakao.com/_xbxlvsn"),
    },
    {
      content: "공유링크 복사하기",
      color: "#ffe32c",
      onclick: copyToClipboard,
    },
  ];

  const handleOverlayClick = (e) => {
    if (isModalActive) {
      e.stopPropagation();
    } else {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Title>★★★★★</Title>
      <TitleWrapper>
        <Logo src={logo} alt="logo" />
        <Title>은 어떠셨나요</Title>
      </TitleWrapper>
      <Subtitle>여러분들의 소중한 의견이 필요합니다.</Subtitle>

      {menuItems.map(({ content, color, onclick }, index) => (
        <Menu key={index} content={content} color={color} onClick={onclick} />
      ))}
    </Overlay>
  );
};

export default Modal;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  margin-bottom: 6px;
`;

const Title = styled.h1`
  color: white;
`;

const Subtitle = styled.p`
  color: #cacaca;
  font-size: 10px;
  margin-bottom: 34px;
`;

const Logo = styled.img`
  width: 80px;
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
