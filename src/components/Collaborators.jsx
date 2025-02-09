import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultProfileImg from "../assets/default_profile_temp.png";

const Collaborators = ({ images, count }) => {
  return (
    <Container>
      <Wrapper>
        {images.map((image, index) => (
          <ProfileCircle key={index} imageUrl={image} />
        ))}
      </Wrapper>
      <Text>
        <TextBold>+{count}</TextBold>
        <span>명이 함께합니다</span>
      </Text>
    </Container>
  );
};

const ProfileCircle = ({ imageUrl }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || defaultProfileImg);

  useEffect(() => {
    setImgSrc(imageUrl || defaultProfileImg);
  }, [imageUrl]);

  return (
    <Image
      src={imgSrc}
      alt="Collaborator"
      onError={() => setImgSrc(defaultProfileImg)}
    />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: -12px;
  border: 1.2px solid #fff;
  object-fit: cover;
`;

const TextBold = styled.span`
  font-weight: 600;
`;

const Text = styled.div`
  font-size: 10px;
  color: #707070;
  text-align: center;
  width: 107px;
  height: 13px;
`;

export default Collaborators;
