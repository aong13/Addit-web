import React from "react";
import styled from "styled-components";

const ImageRowGrid = ({ data, onImageSelect }) => {
  const renderItem = (item) => (
    <TouchableImage onClick={() => onImageSelect(item.tickleId)}>
      <Image src={item.thumbnail} />
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
