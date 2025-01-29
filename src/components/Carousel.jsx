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
  display: flex;
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

const Image = styled.img`
  max-height: 400px;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
