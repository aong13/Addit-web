import React, { useState } from "react";
import styled from "styled-components";

const SelectableImageGrid = ({ data, onImageSelect }) => {
  const [imgSrc, setImgSrc] = useState(null); // 기본 이미지 없음

  const renderItem = (item) => (
    <ImageItem onClick={() => onImageSelect(item.tickleId)} isError={!imgSrc}>
      <img src={item.tickleImage || imgSrc} alt="relayImg" />
    </ImageItem>
  );

  return <GridWrapper>{data.map(renderItem)}</GridWrapper>;
};

export default SelectableImageGrid;

const GridWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const ImageItem = styled.div`
  cursor: pointer;
  width: calc(20% - 6px); /* 최대 5개 */
  position: relative;
  background-color: ${(props) =>
    props.isError
      ? "#d3d3d3"
      : "transparent"}; /* 이미지를 불러오지 못했을 때 회색 배경 */
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 8px;
    aspect-ratio: 9 / 16; /* 이미지 비율 유지 */
    object-fit: cover;
    width: 100%;
    height: auto;
    transition: filter 0.3s ease;
  }

  &:hover img {
    filter: brightness(0.8);
  }
`;
