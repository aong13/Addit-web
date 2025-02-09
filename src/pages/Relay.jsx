import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { relayData } from "../assets/dummy_relay"; // 더미 데이터 임포트
import RelayHeader from "../components/relay/RelayHeader";
import BottomBar from "../components/relay/BottomBar";
import { useParams } from "react-router-dom";

import { handleNext, handlePrev } from "../utils/slideHandler";

const Relay = () => {
  const { id } = useParams();

  // 이미지 저장
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const totalImages = images.length;

  //추후 API로 변경
  const fetchRelayData = () => {
    const fetchedImages = relayData.data?.map((item) => item.image) || [];
    setImages(fetchedImages);
  };

  useEffect(() => {
    fetchRelayData();
  }, []); //마운트시

  //다음꺼 하나씩 렌더링
  useEffect(() => {
    if (totalImages > 1) {
      const nextIndex = (currentIndex + 1) % totalImages;
      const img = new window.Image();
      img.src = images[nextIndex];
    }
  }, [currentIndex, images, totalImages]);

  const handleClick = (direction) => {
    if (direction === "prev") {
      handlePrev(currentIndex, setCurrentIndex, setTranslateX);
    } else if (direction === "next") {
      handleNext(currentIndex, setCurrentIndex, setTranslateX, totalImages);
    }
  };

  return (
    <RelayContainer>
      <RelayHeader title={relayData.data[currentIndex]?.relayTitle} />
      <SlideWrapper translateX={translateX}>
        {images.map((src, index) => (
          <Slide key={index} src={src} alt={`Slide ${index + 1}`} />
        ))}
      </SlideWrapper>
      <BottomBar
        relayData={relayData.data[currentIndex] || { reactions: [] }}
      />
      {totalImages > 1 && (
        <>
          <ClickArea left onClick={() => handleClick("prev")} />
          <ClickArea onClick={() => handleClick("next")} />
        </>
      )}
    </RelayContainer>
  );
};

export default Relay;

const RelayContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: black;
`;

const SlideWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(${(props) => props.translateX}%);
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ClickArea = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  cursor: pointer;
  z-index: 2;
  ${({ left }) => (left ? "left: 0;" : "right: 0;")}
`;
