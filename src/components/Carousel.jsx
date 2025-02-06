import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import defaultProfileImg from "../assets/default_profile_temp.png";

const Carousel = ({ data, onFocusChange, selectedTickleId }) => {
  const [isSliding, setIsSliding] = useState(false);
  const [focusedRelayId, setFocusedRelayId] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    beforeChange: (current, next) => {
      setIsSliding(true); // 슬라이드 시작
      onFocusChange(data[next]?.relayId); // 부모에게 포커스된 relayId 전달
    },
    afterChange: (current) => {
      setIsSliding(false); // 슬라이드 끝
      setFocusedRelayId(data[current]?.relayId); // 현재 중앙 아이템의 relayId 저장
    },
  };

  const handleItemClick = (relayId) => {
    if (!isSliding) {
      //슬라이드 아닐 때만 click event
      if (relayId === focusedRelayId) {
        navigate(`/relay/${relayId}`); // 클릭한 항목의 relayId로 이동
      }
    }
  };

  const renderItem = (item, index) => {
    // 선택된 티클의 데이터
    const selectedTickle =
      item.tickles.find((tickle) => tickle.tickleId === selectedTickleId) ||
      item.tickles[0]; // 기본 첫번째

    return (
      <ImageWrapper
        key={selectedTickle.tickleId || `tickle-${index}`}
        onClick={() => handleItemClick(item.relayId)}
      >
        <Thumbnail
          src={selectedTickle.thumbnail}
          alt={`Slide ${selectedTickle.tickleId || index}`}
        />
        <Overlay>
          <ProfileImg
            src={selectedTickle?.profileImage || defaultProfileImg}
            alt="Profile Img"
          />
          <Nickname>{selectedTickle.nickname || "No Name"}</Nickname>
        </Overlay>
      </ImageWrapper>
    );
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {data.map((relay, index) => renderItem(relay, index))}
      </Slider>
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
  opacity: 0.8;
  outline: none;

  .slick-center & {
    opacity: 1;
    transform: scale(1);
  }

  .slick-slide:not(.slick-center) & {
    transform: scale(0.8);
  }
  &:hover img {
    filter: brightness(0.9);
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
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
  margin: 8px 0px; //그림자 잘림 방지
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
