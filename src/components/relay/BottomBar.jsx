import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeartBtn from "./HeartBtn";
import askIcon from "../../assets/icons/bubble.svg";
import plusIcon from "../../assets/icons/plus.svg";
import useRelayStore from "../../store/useRelayStore";
import useModalStore from "../../store/useModalStore";
import defaultImg from "../../assets/default_profile_temp.png";
const BottomBar = ({ relayData }) => {
  const navigate = useNavigate();
  const [isPlusBtnActive, setIsPlusBtnActive] = useState(false);
  const [isAskBtnActive, setIsAskBtnActive] = useState(false);
  const setRelayData = useRelayStore((state) => state.setRelayData);
  const { openModal } = useModalStore();

  const handlePlusClick = () => {
    useRelayStore.getState().resetAll();
    setRelayData(
      relayData.relayId,
      relayData.tickleId,
      relayData.relayTitle,
      relayData.tags
    );

    navigate(`/upload/tickle`, {});
  };

  const handleAskClick = () => {
    openModal();
  };

  console.log(relayData);
  return (
    <Container>
      <Description>
        <div>
          <ProfileCircle image={relayData?.authorImage || defaultImg} />
          <h1>{relayData?.authorNickname || "익명"}</h1>
        </div>
        <p>{relayData?.tickleDescription}</p>
      </Description>
      <BottomContainer>
        <HeartBtn
          likeCount={relayData?.tickleLikes}
          tickleId={relayData?.tickleId}
        />
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
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: 50px 20px 30px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.15) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  /* background-color: red; */
`;
const BottomContainer = styled.div`
  padding-top: 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Description = styled.div`
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  h1 {
    color: white;
    margin-bottom: 10px;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  }
  p {
    color: white;
    margin-bottom: 10px;
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    margin: 10px 100px 10px 10px;
    line-height: 1.2;
  }
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

const ProfileCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border: 2px solid #fff;
`;

export default BottomBar;
