import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { relayData } from "../assets/dummy_relay";
import RelayHeader from "../components/relay/RelayHeader";
import BottomBar from "../components/relay/BottomBar";
import { useParams } from "react-router-dom";

const Relay = () => {
  const [relay, setRelay] = useState([]); // 릴레이 데이터
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 릴레이 인덱스
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [loadedIndex, setLoadedIndex] = useState(0); // 이미 로드된 릴레이 데이터 인덱스
  const { id } = useParams();
  useEffect(() => {
    loadMoreData();
  }, []);

  // 최대 3개씩 로드
  const loadMoreData = () => {
    if (loading || loadedIndex >= relayData.data.length) return;
    setLoading(true);
    const nextData = relayData.data.slice(
      loadedIndex,
      loadedIndex + 3 // 한 번에 최대 3개씩 추가
    );

    // 기존 데이터랑 안겹치도록
    setRelay((prevRelay) => [
      ...prevRelay,
      ...nextData.filter(
        (data) =>
          !prevRelay.some(
            (existingData) => existingData.tickleId === data.tickleId
          )
      ),
    ]);

    setLoadedIndex(loadedIndex + nextData.length);
    setLoading(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    if (currentIndex < relay.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      loadMoreData();
    }
  };

  return (
    <SliderContainer>
      <RelayHeader title={relay[currentIndex]?.relayTitle || "Loading"} />
      <SliderWrapper currentIndex={currentIndex}>
        {relay.map((relayItem, index) => (
          <Img
            key={relayItem.tickleId}
            src={relayItem.image}
            alt={`Relay ${index + 1}`}
            isActive={currentIndex === index}
          />
        ))}
      </SliderWrapper>
      <BottomBar relayData={relay[currentIndex] || { reactions: [] }} />
      <ButtonContainer>
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          left
        ></Button>
        <Button onClick={handleNext} disabled={loading} right></Button>
      </ButtonContainer>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  width: 100%;
  transform: ${(props) => `translateX(-${props.currentIndex * 100}%)`};
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const Button = styled.button`
  background-color: transparent;
  width: 50%;
  height: 100vh;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.left &&
    `
    justify-content: flex-start;
    padding-left: 20px;
  `}

  ${(props) =>
    props.right &&
    `
    justify-content: flex-end;
    padding-right: 20px;
  `}
`;

export default Relay;
