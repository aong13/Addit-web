import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logoIcon from "../assets/logo_white.svg";
import BackIcon from "../assets/icons/arrow_back_white.svg";
import { Button } from "../components/Button";
import RandomProfile from "../components/RandomProfile";
import { NickNameInput } from "../components/Input/NicknameInput";
import { generateRandomName } from "../utils/nickname";
import TermAccordion from "../components/TermAccordion";
import useToastStore from "../store/useToastStore";

const Guest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, tags, relayId, tickleId, fromUpload, fromNewRelay } =
    location.state || {};
  const addToast = useToastStore((state) => state.addToast);

  const [userName, setUserName] = useState("");
  const [userImage, setuserImage] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = (isChecked) => {
    setIsAgreed(isChecked);
  };

  useEffect(() => {
    setUserName(generateRandomName());
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const putData = () => {
    if (isSubmitting) return;

    setIsSubmitting(true); // 요청 시작 시 비활성화

    setTimeout(() => {
      setIsSubmitting(false); // 1.5초 후 해제
    }, 1500);

    if (!userName.trim()) {
      addToast("닉네임을 설정해주세요.");
      // setIsSubmitting(false);
      return;
    }
    if (!isAgreed) {
      addToast("개인정보 수집 및 이용에 동의해주세요!");
      // setIsSubmitting(false);
      return;
    }

    sessionStorage.setItem("userName", userName);
    sessionStorage.setItem("userImage", userImage);

    if (fromUpload) {
      navigate("/upload/tickle", {
        state: { fromUpload, relayId, tickleId, title, tags },
        replace: true,
      });
    } else if (fromNewRelay) {
      navigate("/upload/relay", { replace: true });
    } else {
      navigate("/home", { replace: true });
    }
  };

  return (
    <Container>
      {(fromUpload || fromNewRelay) && (
        <BackButton onClick={() => navigate(-1)}>
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
        disabled={isSubmitting}
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
