import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";

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
    swipeToSlide: true,
    touchMove: true,
  };

  // 포커스된 캐러셀만 클릭 시 이동
  const handleItemClick = (relayId, tickleId) => {
    if (!isSliding && relayId === focusedRelayId) {
      navigate(`/relay/${relayId}/tickle/${tickleId}`);
    }
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {data?.map((relay) => (
          <CarouselItem
            key={relay.relay.relayId}
            item={relay}
            selectedTickleId={selectedTickleId}
            focusedRelayId={focusedRelayId}
            handleItemClick={handleItemClick}
          />
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  width: 100%;
`;
