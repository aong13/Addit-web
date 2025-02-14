import React, { useState, useEffect } from "react";
import styled from "styled-components";
import defaultThumbnail from "../../assets/icons/error_img.png";
import { calculateImgRatio } from "../../utils/relayUtils";

const ImgWithBlur = ({ imageSrc }) => {
  const [fillBlur, setFillBlur] = useState(false);

  useEffect(() => {
    if (imageSrc) {
      calculateImgRatio(imageSrc, (ratio) => {
        setFillBlur(ratio <= 3 / 4); // 3:4보다 크면 blur 적용
      });
    }
  }, [imageSrc]);

  return (
    <>
      <Thumbnail
        src={imageSrc || defaultThumbnail}
        alt="thumbnail"
        $fill={fillBlur}
        loading="lazy"
      />
      {!fillBlur && (
        <BlurBackground
          src={imageSrc || defaultThumbnail}
          alt="blurred background"
          loading="lazy"
        />
      )}
    </>
  );
};

export default ImgWithBlur;

const BlurBackground = styled.img`
  position: absolute;
  width: 120%;
  height: 130%;
  object-fit: cover;
  filter: blur(14px) brightness(0.7);
  overflow: visible;
`;

const Thumbnail = styled.img`
  position: relative;
  width: 100%;
  object-fit: ${({ $fill }) => ($fill ? "cover" : "contain")};
  aspect-ratio: 9 / 16;
  z-index: 1;
`;
