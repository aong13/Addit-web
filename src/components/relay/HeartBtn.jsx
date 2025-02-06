import React, { useState } from "react";
import heartOn from "../../assets/icons/heart_on.svg";
import heartOff from "../../assets/icons/heart_off.svg";
import styled, { keyframes } from "styled-components";

const HeartBtn = ({ likeCount }) => {
  const [likes, setLikes] = useState(likeCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setLikes((prev) => prev + 1);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <IconContainer onClick={handleClick}>
      <HeartWrapper>
        <HeartOff src={heartOff} isHidden={isAnimating} />
        {isAnimating && <HeartOn src={heartOn} />}
      </HeartWrapper>
      <Text>{likes}</Text>
    </IconContainer>
  );
};

const heartPop = keyframes`
  0% { transform: scale(1); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HeartWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const HeartOff = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isHidden ? 0.3 : 1)};
  transition: opacity 0.3s ease;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5)); /* ✅ 그림자 추가 */
`;

const HeartOn = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${heartPop} 0.5s ease-in-out;
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`;

export default HeartBtn;
