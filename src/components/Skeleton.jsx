import styled, { keyframes } from "styled-components";

// 공통 shimmer 애니메이션 정의
const shimmerAnimation = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

export const SkeletonBox = styled.div`
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
  border-radius: ${(props) => props.radius || "4px"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  aspect-ratio: ${(props) => props.aspectRatio || "9 / 16"};
  margin: 8px 0;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  animation: ${shimmerAnimation} 1.2s infinite linear;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 25%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 75%
    );
    animation: ${shimmerAnimation} 1.2s infinite linear;
  }
`;

export const SkeletonCarouselItem = styled(SkeletonBox)`
  width: 100%;
  height: auto;
  border-radius: 10px;
  aspect-ratio: 9 / 16;

  .slick-center & {
    transform: scale(1);
    opacity: 1;
  }

  .slick-slide:not(.slick-center) & {
    transform: scale(0.8);
    opacity: 0.7;
  }
`;
