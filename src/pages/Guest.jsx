import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logoIcon from "../assets/logo_white.svg";
import BackIcon from "../assets/icons/arrow_back_white.svg"; // SVG 아이콘 불러오기
import { Button } from "../components/Button";
import RandomProfile from "../components/RandomProfile";
import { NickNameInput } from "../components/NicknameInput";
import { generateRandomName } from "../utils/nickname";
import TermAccordion from "../components/TermAccordion";

const Guest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { relayId, tickleId, fromUpload } = location.state || {};

  const [userName, setUserName] = useState("");
  const [userImage, setuserImage] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = (isChecked) => {
    setIsAgreed(isChecked);
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("userName");
    if (isLoggedIn) {
      navigate("/home");
    } else {
      setUserName(generateRandomName());
    }
  }, []);

  const putData = () => {
    if (!isAgreed) {
      // TODO: 토스트 메시지 추가
      return;
    }
    if (!userName.trim()) {
      // TODO: 토스트 메시지 추가
      return;
    }

    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userImage", userImage);
    if (fromUpload) {
      navigate(`/relay/${relayId}/tickle/${tickleId}`);
    } else {
      navigate("/home");
    }
  };

  return (
    <Container>
      {fromUpload && (
        <BackButton onClick={() => navigate(-3)}>
          <img src={BackIcon} alt="backbtn" />
        </BackButton>
      )}
      <Logo src={logoIcon} alt="logo" />
      <H1>프로필 설정하기</H1>
      <RandomProfile onImageChange={setuserImage} />
      <NickNameInput onTextChange={setUserName} defaultValue={userName} />
      <TermAccordion onAgreeChange={handleAgree} />
      <Button
        text="생성하기"
        onClick={putData}
        bgColor="#ffffff50"
        borderColor="#fff"
        textColor="#fff"
      />
    </Container>
  );
};

export default Guest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #7fa3ff;
  min-height: 100vh;
  padding-top: 100px;
  gap: 20px;
  position: relative;
`;

const Logo = styled.img`
  height: 30px;
`;

const H1 = styled.h1`
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 40px;
  left: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
`;
