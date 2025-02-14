import React, { memo } from "react";
import styled from "styled-components";
import { SkeletonBox } from "./Skeleton";
import ImgWithBlur from "./common/ImgWithBlur";

const ImageRowGrid = memo(({ data, onImageSelect }) => {
  return (
    <GridWrapper>
      {data?.length === 0
        ? Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBox key={index} width="calc(20% - 6px)" />
          ))
        : data.map((item) => (
            <ImageItem
              key={item.tickleId}
              onClick={() => onImageSelect(item.tickleId)}
            >
              <ImgWithBlur imageSrc={item.tickleImage} />
            </ImageItem>
          ))}
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
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:hover {
    filter: brightness(0.8);
  }
`;
