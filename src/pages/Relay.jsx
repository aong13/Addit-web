import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllRelay, getTicklesData } from "../apis/relayApi";
import { handlePrevious, handleNext } from "../utils/slideHandler";
import useModalStore from "../store/useModalStore";

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

  if (!tickle) {
    return <></>;
  }

  return (
    <Container>
      <ImageWrapper>
        <TickleImage src={tickle.tickleImage} alt="Tickle" />
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
  background-color: black;
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

const TickleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  }
`;
