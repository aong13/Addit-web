import React from "react";
import styled from "styled-components";
import defaultProfileImg from "../../assets/default_profile.png";
import ImgWithBlur from "../common/ImgWithBlur";

const CarouselItem = ({ item, selectedTickleId, handleItemClick }) => {
  const selectedTickle =
    item?.tickle.find((tickle) => tickle.tickleId === selectedTickleId) ||
    item.tickle[0];

  return (
    <ImageWrapper
      key={selectedTickle?.tickleId}
      onClick={() =>
        handleItemClick(item.relay.relayId, selectedTickle.tickleId)
      }
    >
      <ImgWithBlur imageSrc={selectedTickle?.tickleImage} />

      <Overlay>
        <ProfileImg
          src={selectedTickle?.authorImage || defaultProfileImg}
          alt="Profile Img"
        />
        <Nickname>{selectedTickle?.authorNickname}</Nickname>
      </Overlay>
    </ImageWrapper>
  );
};

export default CarouselItem;

const ImageWrapper = styled.div`
  margin: 8px 0; //그림자 안가리게
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  outline: none;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  .slick-slide:not(.slick-center) & {
    transform: scale(0.8);
    opacity: 0.9;
  }
  &:hover {
    filter: brightness(0.6);
    transition: filter 0.3s ease;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 16px;
  left: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
`;

const Nickname = styled.span`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #eee;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  z-index: 2;
`;
