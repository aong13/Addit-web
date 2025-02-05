import React from "react";
import styled from "styled-components";

const ImageRowGrid = ({ data, onImageSelect }) => {
  const numColumns = 5;

  const imageWidth = (window.innerWidth - 24 - 16 * 2) / numColumns; // gap 6px, layoutPadding 16px
  const imageHeight = imageWidth * (16 / 9);

  const renderItem = (item) => (
    <TouchableImage onClick={() => onImageSelect(item.tickleId)}>
      <Image
        src={item.thumbnail}
        style={{ width: imageWidth, height: imageHeight }}
      />
    </TouchableImage>
  );

  return <FlatListWrapper>{data.map(renderItem)}</FlatListWrapper>;
};

export default ImageRowGrid;

const FlatListWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  margin: 0 10px;
`;

const TouchableImage = styled.div`
  margin-right: 6px;
  margin-bottom: 6px;
  cursor: pointer;
`;

const Image = styled.img`
  border-radius: 8px;
`;
