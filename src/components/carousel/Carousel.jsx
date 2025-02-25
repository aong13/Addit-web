import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselItem from "./CarouselItem";
import { SkeletonCarouselItem } from "../Skeleton";
import useRelayStore from "../../store/useRelayStore";

const Carousel = ({ onFocusChange, selectedTickleId }) => {
  const [isSliding, setIsSliding] = useState(false);
  const navigate = useNavigate();

  const {
    relays,
    fetchRelays,
    focusedRelayId,
    setFocusedRelayId,
    relayIds,
    loading,
  } = useRelayStore();

  useEffect(() => {
    fetchRelays(); // 초기 데이터 로드
  }, [fetchRelays]);

  useEffect(() => {
    if (relays.length > 0) {
      setFocusedRelayId(relays[0].relay.relayId);
      onFocusChange(relays[0].relay.relayId);
    }
  }, [relays, onFocusChange, setFocusedRelayId]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, relays.length),
    slidesToScroll: 1,
    centerMode: relays.length > 3,
    centerPadding: "0px",
    focusOnSelect: true,
    beforeChange: (_, next) => {
      if (relays.length < 3) return;

      setIsSliding(true);
      const nextRelayId = relays[next]?.relay?.relayId;
      setFocusedRelayId(nextRelayId);
      onFocusChange(nextRelayId);
    },
    afterChange: (current) => {
      setIsSliding(false);
      // 슬라이드가 마지막에 도달했을 때 데이터를 더 불러오기
      if (current === relays.length - 3 && !loading) {
        fetchRelays(); // 다음 데이터를 불러오는 함수 호출
      }
    },
  };

  const handleItemClick = (relayId, tickleId) => {
    if (!isSliding && (relays.length <= 3 || relayId === focusedRelayId)) {
      navigate(`/relay/${relayId}/tickle/${tickleId}`);
    }
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {relays.length === 0
          ? Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonCarouselItem key={idx} />
            ))
          : relays?.map((relay) => (
              <CarouselItem
                key={relay.relay.relayId}
                item={relay}
                selectedTickleId={selectedTickleId}
                focusedRelayId={focusedRelayId}
                handleItemClick={handleItemClick}
              />
            ))}
      </Slider>
      <ul>
        {relayIds.map((id, index) => (
          <li key={index}>
            {index}: {id}
          </li>
        ))}
      </ul>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
