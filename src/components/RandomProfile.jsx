import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import reloadIcon from "../assets/icons/reload.svg";

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
  const getRandomImage = () =>
    images[Math.floor(Math.random() * images.length)];

  const [image, setImage] = useState(getRandomImage);

  useEffect(() => {
    onImageChange(image);
  }, [image, onImageChange]);

  const changeRandomImage = useCallback(() => {
    const newImage = getRandomImage();
    setImage(newImage);
    onImageChange(newImage);
  }, [onImageChange]);

  return (
    <ProfileCircleWrapper>
      <ProfileCircle image={image} />
      <Button onClick={changeRandomImage}>
        <img src={reloadIcon} alt="reload icon" />
      </Button>
    </ProfileCircleWrapper>
  );
};

export default RandomProfile;

const ProfileCircleWrapper = styled.div`
  position: relative;
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
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  padding: 6px;
`;
