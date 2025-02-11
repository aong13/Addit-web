import React, { useState, useCallback } from "react";
import styled from "styled-components";
import reloadIcon from "../assets/icons/reload.svg";

// 이미지 배열
const images = [
  "https://storage.googleapis.com/addit-prod/user_bear.jpg",
  "https://storage.googleapis.com/addit-prod/user_dog.jpg",
  "https://storage.googleapis.com/addit-prod/user_rabbit.jpg",
  "https://storage.googleapis.com/addit-prod/user_cat.jpg",
  "https://storage.googleapis.com/addit-prod/user_hamster.jpg",
  "https://storage.googleapis.com/addit-prod/user_koala.jpg",
  "https://storage.googleapis.com/addit-prod/user_duck.jpg",
  "https://storage.googleapis.com/addit-prod/user_tiger.jpg",
];

const RandomProfile = ({ onImageChange }) => {
  const [image, setImage] = useState(images[0]); // 초기 이미지 설정

  // 랜덤 이미지 변경 함수
  const getRandomImage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const newImage = images[randomIndex];
    setImage(newImage);
    onImageChange(newImage); // 부모 컴포넌트로 변경된 이미지 전달
  }, [onImageChange]);

  return (
    <Wrapper>
      <ProfileCircleWrapper>
        <ProfileCircle image={image} />
        <Button onClick={getRandomImage}>
          <img src={reloadIcon} alt="reload icon" />
        </Button>
      </ProfileCircleWrapper>
    </Wrapper>
  );
};

export default RandomProfile;

// ✅ 스타일 컴포넌트
const Wrapper = styled.div`
  text-align: center;
`;

const ProfileCircleWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #4574ec;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;

  img {
    height: 16px;
  }
`;
