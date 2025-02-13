import React, { useState, memo } from "react";
import styled from "styled-components";
import { SkeletonBox } from "./Skeleton";

const ImageRowGrid = memo(({ data, onImageSelect }) => {
  const [imgSrc, setImgSrc] = useState(null);

  const renderItem = (item) => (
    <ImageItem onClick={() => onImageSelect(item.tickleId)} isError={!imgSrc}>
      <img src={item.tickleImage || imgSrc} alt="relayImg" />
    </ImageItem>
  );

  return (
    <GridWrapper>
      {data?.length === 0
        ? Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBox key={index} width="calc(20% - 6px)" />
          ))
        : data?.map((item, index) => renderItem(item, index))}
    </GridWrapper>
  );
});

export default ImageRowGrid;

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
    aspect-ratio: 9 / 16;
    object-fit: cover;
    width: 100%;
    height: auto;
    transition: filter 0.3s ease;
  }

  &:hover img {
    filter: brightness(0.8);
  }
`;
