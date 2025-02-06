import React from "react";
import styled from "styled-components";
import HeartBtn from "./HeartBtn";
import askIcon from "../../assets/icons/bubble.svg";
import plusIcon from "../../assets/icons/plus.svg";
const BottomBar = ({ relayData }) => {
  return (
    <BottomContainer>
      <HeartBtn likeCount={relayData?.like} />

      <PlusBtn>
        <img src={plusIcon} alt="plusIcon" />
      </PlusBtn>

      <AskBtn>
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

const AskBtn = styled.div`
  display: flex;
  background: #eaeaea;
  width: 42px;
  height: 42px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  img {
    width: 26px;
    height: 26px;
  }
`;
const PlusBtn = styled.div`
  display: flex;
  background: #7fa3ff;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  img {
    width: 26px;
    height: 26px;
  }
`;

export default BottomBar;
