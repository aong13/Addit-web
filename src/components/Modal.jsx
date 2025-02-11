import styled from "styled-components";
import useModalStore from "../store/useModalStore";
import logo from "../assets/logo_white.svg";
import goIcon from "../assets/icons/arrow_box.svg";
const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModalStore();

  if (!isOpen) return null;

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
      <Menu content="친구에게 공유해주기" color="#FFF08F" />
    </Overlay>
  );
};

export default Modal;

const Menu = ({ content, color, onClick }) => {
  return (
    <MenuContainer color={color} onClick={onClick}>
      {content}
      <img src={goIcon} alt="icon" />
    </MenuContainer>
  );
};

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
