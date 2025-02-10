import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultProfileImg from "../assets/default_profile_temp.png";

const Carousel = ({ data = [], onFocusChange, selectedTickleId }) => {
  const [isSliding, setIsSliding] = useState(false);
  const [focusedRelayId, setFocusedRelayId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length > 0) {
      const initialRelayId = data[0]?.relay?.relayId;
      setFocusedRelayId(initialRelayId);
      onFocusChange(initialRelayId);
    }
  }, [data, onFocusChange]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    beforeChange: (_, next) => {
      setIsSliding(true);
      const nextRelayId = data[next]?.relay?.relayId;
      setFocusedRelayId(nextRelayId);
      onFocusChange(nextRelayId);
    },
    afterChange: () => setIsSliding(false),
  };

  // 포커스된 캐러셀만 클릭 시 이동
  const handleItemClick = (relayId, tickleId) => {
    if (!isSliding && relayId === focusedRelayId) {
      navigate(`/relay/${relayId}/tickle/${tickleId}`);
    }
  };

  const renderItem = (item) => {
    // 선택된 tickleId or 첫 번째 tickle
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

  return (
    <CarouselContainer>
      <Slider {...settings}>{data.map((relay) => renderItem(relay))}</Slider>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  width: 100%;
`;

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
