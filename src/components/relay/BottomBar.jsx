import React, { useState } from "react";
import styled from "styled-components";
import HeartBtn from "./HeartBtn";
import askIcon from "../../assets/icons/bubble.svg";
import plusIcon from "../../assets/icons/plus.svg";

const BottomBar = ({ relayData }) => {
  const [isPlusBtnActive, setIsPlusBtnActive] = useState(false);
  const [isAskBtnActive, setIsAskBtnActive] = useState(false);

  const handlePlusClick = () => {};

  const handleAskClick = () => {};

  return (
    <BottomContainer>
      <HeartBtn likeCount={relayData?.like} />

      <PlusBtn
        onClick={handlePlusClick}
        isActive={isPlusBtnActive}
        onMouseDown={() => setIsPlusBtnActive(true)}
        onMouseUp={() => setIsPlusBtnActive(false)}
        onMouseLeave={() => setIsPlusBtnActive(false)}
      >
        <img src={plusIcon} alt="plusIcon" />
      </PlusBtn>

      <AskBtn
        onClick={handleAskClick}
        isActive={isAskBtnActive}
        onMouseDown={() => setIsAskBtnActive(true)}
        onMouseUp={() => setIsAskBtnActive(false)}
        onMouseLeave={() => setIsAskBtnActive(false)}
      >
        <img src={askIcon} alt="askIcon" />
      </AskBtn>
    </BottomContainer>
  );
};

const BottomContainer = styled.div`
  padding: 30px 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isActive ? "scale(1.1)" : "scale(1)")};
`;

const AskBtn = styled(Btn)`
  background: #eaeaea;
  width: 42px;
  height: 42px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  img {
    width: 26px;
    height: 26px;
  }
`;

const PlusBtn = styled(Btn)`
  background: #7fa3ff;
  width: 50px;
  height: 50px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  img {
    width: 26px;
    height: 26px;
  }
`;

export default BottomBar;
