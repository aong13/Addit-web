import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ data }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {data.flatMap((relay) =>
          relay.tickles.map((tickle, index) => (
            <ImageWrapper key={tickle.tickleId || `tickle-${index}`}>
              <ProfileWrapper>
                <ProfileImage
                  src={tickle.profileImage || "/default-profile.jpg"}
                  alt={`Profile ${tickle.tickleId || index}`}
                />
                <Nickname>{tickle.nickname || "No Name"}</Nickname>
              </ProfileWrapper>
              <Image
                src={tickle.thumbnail}
                alt={`Slide ${tickle.tickleId || index}`}
              />
            </ImageWrapper>
          ))
        )}
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
  padding: 10px 0px; // 그림자 보이도록

  .slick-center & {
    opacity: 1;
  }

  .slick-slide:not(.slick-center) & {
    transform: scale(0.8);
    opacity: 0.8;
  }
`;

const ProfileWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  z-index: 1;
`;

const Image = styled.img`
  max-height: 400px;
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
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
`;
