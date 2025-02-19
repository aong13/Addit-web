import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultProfileImg from "../assets/default_profile.png";

const Collaborators = ({ images = [], count }) => {
  return (
    <Container>
      <ProfileWrapper hasSingleImage={images.length === 1}>
        {images.map((image, index) => (
          <ProfileCircle key={index} imageUrl={image} isFirst={index === 0} />
        ))}
      </ProfileWrapper>
      {count > 0 ? (
        <Text>
          <TextBold>+{count}</TextBold>
          <span>명이 함께합니다</span>
        </Text>
      ) : (
        <Text>현재 참여자가 없습니다</Text>
      )}
    </Container>
  );
};

const ProfileCircle = ({ imageUrl, isFirst }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || defaultProfileImg);

  useEffect(() => {
    setImgSrc(imageUrl || defaultProfileImg);
  }, [imageUrl]);

  return (
    <Image
      src={imgSrc}
      alt="Collaborator"
      onError={() => setImgSrc(defaultProfileImg)}
      isFirst={isFirst}
    />
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ hasSingleImage }) =>
    hasSingleImage ? "center" : "flex-start"};
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.2px solid #fff;
  object-fit: cover;
  margin-left: ${({ isFirst }) => (isFirst ? "0" : "-12px")};
`;

const TextBold = styled.span`
  font-weight: 600;
`;

const Text = styled.div`
  font-size: 10px;
  color: #707070;
  text-align: center;
  height: 13px;
`;

export default Collaborators;
