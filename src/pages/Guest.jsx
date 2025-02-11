import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoIcon from "../assets/logo_white.svg";
import { Button } from "../components/Button";
import RandomProfile from "../components/RandomProfile";
import { NickNameInput } from "../components/NicknameInput";

const Guest = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("userToken");

    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const putData = () => {
    sessionStorage.setItem("userToken", "guest");

    if (nickName) {
      sessionStorage.setItem("nickName", nickName);
    }

    if (profileImage) {
      sessionStorage.setItem("profileImage", profileImage);
    }

    navigate("/home");
  };

  return (
    <Container>
      <Logo src={logoIcon} alt="logo" />
      <H1>프로필 설정하기</H1>
      <RandomProfile onImageChange={setProfileImage} />
      <NickNameInput onTextChange={setNickName} />
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
`;
