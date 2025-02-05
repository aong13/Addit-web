import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ data, onFocusChange, selectedTickleId }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    beforeChange: (current, next) => {
      onFocusChange(data[next]?.relayId); // 부모에게 포커스된 relayId 전달
    },
  };

  const renderItem = (item, index) => {
    // 선택된 티클의 데이터
    const selectedTickle =
      item.tickles.find((tickle) => tickle.tickleId === selectedTickleId) ||
      item.tickles[0]; // 기본 첫번째

    return (
      <ImageWrapper key={selectedTickle.tickleId || `tickle-${index}`}>
        <ImageContainer>
          <Image
            src={selectedTickle.thumbnail}
            alt={`Slide ${selectedTickle.tickleId || index}`}
          />
          <Overlay>
            <ProfileImage
              src={selectedTickle.profileImage || "/default-profile.jpg"}
              alt={`Profile ${selectedTickle.tickleId || index}`}
            />
            <Nickname>{selectedTickle.nickname || "No Name"}</Nickname>
          </Overlay>
        </ImageContainer>
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
  box-sizing: border-box;
`;

const ImageWrapper = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  padding: 10px 0px;

  .slick-center & {
    opacity: 1;
  }

  .slick-slide:not(.slick-center) & {
    transform: scale(0.8);
    opacity: 0.8;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;
const Overlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.img`
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
`;

const Nickname = styled.span`
  margin-top: 8px;
  font-size: 0.625rem;
  font-weight: 600;
  color: #eeeeee;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
`;
