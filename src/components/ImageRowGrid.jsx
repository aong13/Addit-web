import React from "react";
import styled from "styled-components";

const SelectableImageGrid = ({ data, onImageSelect }) => {
  const renderItem = (item) => (
    <ImageItem onClick={() => onImageSelect(item.tickleId)}>
      <img src={item.thumbnail} alt="relayImg" />
    </ImageItem>
  );

  return <GridWrapper>{data.map(renderItem)}</GridWrapper>;
};

export default SelectableImageGrid;

const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const ImageItem = styled.div`
  cursor: pointer;
  width: calc(20% - 6px); /* 최대 5개*/
  img {
    border-radius: 8px;
    aspect-ratio: 9 / 16; /* 이미지 비율 유지 */
    object-fit: cover;
    width: 100%;
    height: auto;
  }
`;
