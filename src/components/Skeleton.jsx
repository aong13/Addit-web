import styled from "styled-components";

const SkeletonBox = styled.div`
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: ${(props) => props.radius || "4px"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "20px"};
  aspect-ratio: ${(props) => props.aspectRatio || "9 / 16"};
  margin: 8px 0;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
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
