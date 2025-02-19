import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";
import { SkeletonCarouselItem } from "../Skeleton";

const Carousel = ({ data = [], onFocusChange, selectedTickleId }) => {
  const [isSliding, setIsSliding] = useState(false);
  const [focusedRelayId, setFocusedRelayId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length > 0) {
      const initialRelayId =
        data.length === 3 ? data[1]?.relay?.relayId : data[0]?.relay?.relayId;
      setFocusedRelayId(initialRelayId);
      onFocusChange(initialRelayId);
    }
  }, [data, onFocusChange]);

  const settings = {
    infinite: data.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, data.length),
    slidesToScroll: 1,
    centerMode: data.length > 3,
    centerPadding: "0px",
    focusOnSelect: true,
    beforeChange: (_, next) => {
      if (data.length < 3) return;

      setIsSliding(true);
      const nextRelayId = data[next]?.relay?.relayId;
      setFocusedRelayId(nextRelayId);
      onFocusChange(nextRelayId);
    },
    afterChange: () => {
      setIsSliding(false);
    },
  };

  const handleItemClick = (relayId, tickleId) => {
    if (!isSliding && (data.length <= 3 || relayId === focusedRelayId)) {
      navigate(`/relay/${relayId}/tickle/${tickleId}`);
    }
  };
  return (
    <CarouselContainer>
      <Slider {...settings}>
        {data.length === 0
          ? Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonCarouselItem key={idx} />
            ))
          : data?.map((relay) => (
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
  overflow: hidden;
`;
