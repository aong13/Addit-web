import React from "react";
import styled from "styled-components";
import defaultProfileImg from "../assets/default_profile_temp.png";

const CarouselItem = ({
  item,
  selectedTickleId,
  focusedRelayId,
  handleItemClick,
}) => {
  const selectedTickle =
    item.tickle.find((tickle) => tickle.tickleId === selectedTickleId) ||
    item.tickle[0];

  return (
    <ImageWrapper
      key={selectedTickle.tickleId}
      onClick={() =>
        handleItemClick(item.relay.relayId, selectedTickle.tickleId)
      }
    >
      <Thumbnail
        src={selectedTickle.tickleImage || defaultProfileImg}
        alt="thumbnail"
      />
      <Overlay>
        <ProfileImg
          src={selectedTickle.authorImage || defaultProfileImg}
          alt="Profile Img"
        />
        <Nickname>{selectedTickle.authorNickname || "No Name"}</Nickname>
      </Overlay>
    </ImageWrapper>
  );
};

export default CarouselItem;

const ImageWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 1;
  outline: none;

  .slick-slide:not(.slick-center) & {
    transform: scale(0.8);
    opacity: 0.9;
  }

  &:hover img {
    filter: brightness(0.8);
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
`;

const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  margin: 8px 0px;
  aspect-ratio: 9 / 16;
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
`;
