import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logoIcon from "../assets/logo_white.svg";
import { Button } from "../components/Button";
import RandomProfile from "../components/RandomProfile";
import { NickNameInput } from "../components/NicknameInput";
import { generateRandomName } from "../utils/nickname";

const Guest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { relayId, tickleId, fromUpload } = location.state || {};

  const [userName, setUserName] = useState("");
  const [userImage, setuserImage] = useState("");

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("userName");
    if (isLoggedIn) {
      navigate("/home");
    } else {
      setUserName(generateRandomName());
    }
  }, [navigate]);

  const putData = () => {
    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userImage", userImage);
    if (fromUpload) {
      navigate(`/relay/${relayId}/tickle/${tickleId}`, { replace: true });
    } else {
      navigate("/home");
    }
  };

  return (
    <Container>
      <Logo src={logoIcon} alt="logo" />
      <H1>프로필 설정하기</H1>
      <RandomProfile onImageChange={setuserImage} />
      <div />
      <NickNameInput onTextChange={setUserName} defaultValue={userName} />
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
  justify-content: center;
  background-color: #7fa3ff;
  min-height: 100vh;
  gap: 20px;
`;

const Logo = styled.img`
  height: 30px;
`;

const H1 = styled.h1`
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
`;
