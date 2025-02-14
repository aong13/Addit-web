import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useModalStore from "../../store/useModalStore";
import { getAllRelay, getTicklesData } from "../../apis/relayApi";
import {
  handlePrevious,
  handleNext,
  calculateImgRatio,
} from "../../utils/relayUtils";
import ImgWithBlur from "../../components/common/ImgWithBlur";

const Relay = () => {
  const [tickle, setTickle] = useState(null);
  const [allRelay, setAllRelay] = useState([]);
  const { openModal } = useModalStore();
  const { relayId, tickleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelayData = async () => {
      try {
        const response = await getTicklesData(tickleId);
        const allRelayData = await getAllRelay(relayId);
        setTickle(response.data);
        setAllRelay(allRelayData.data.tickleThumbnails);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (relayId && tickleId) {
      fetchRelayData();
    }

    //모달관리
    let count = parseInt(localStorage.getItem("visitCount")) || 0;
    count += 1;
    localStorage.setItem("visitCount", count);

    if (count >= 10) {
      openModal();
      localStorage.setItem("visitCount", 0);
    }
  }, [relayId, tickleId]);

  return (
    <Container>
      <ImageWrapper>
        <ImgWithBlur imageSrc={tickle?.tickleImage} />
      </ImageWrapper>
      <NavButtons>
        <button
          onClick={() => handlePrevious(allRelay, tickleId, relayId, navigate)}
        ></button>
        <button
          onClick={() => handleNext(allRelay, tickleId, relayId, navigate)}
        ></button>
      </NavButtons>
    </Container>
  );
};

export default Relay;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavButtons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  button {
    background-color: transparent;
    border: none;
    width: 50%;
    cursor: pointer;
    z-index: 2;
    user-select: none;
  }
`;

const BlurBackground = styled.img`
  position: absolute;
  width: 130%;
  height: 130%;
  object-fit: cover;
  filter: blur(10px) brightness(0.7);
`;
