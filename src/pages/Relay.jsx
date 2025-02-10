import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllRelay, getTicklesData } from "../apis/relayApi";
import RelayHeader from "../components/relay/RelayHeader";
import BottomBar from "../components/relay/BottomBar";
import { goToPreviousTickle, goToNextTickle } from "../utils/slideHandler";

const Relay = () => {
  const [tickle, setTickle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { relayId, tickleId } = useParams();
  const navigate = useNavigate();
  const [allRelay, setAllRelay] = useState([]);

  const fetchRelayData = async (relayId, tickleId) => {
    try {
      const response = await getTicklesData(tickleId);
      const allRelayData = await getAllRelay(relayId);
      setTickle(response.data);
      setAllRelay(allRelayData.data.tickleThumbnails);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tickleId) {
      fetchRelayData(relayId, tickleId);
    }
  }, [relayId, tickleId]);

  if (loading) {
    return <div></div>; //로딩처리
  }

  return (
    <RelayContainer>
      <RelayHeader title={tickle?.relayTitle} />
      <TickleImage src={tickle?.tickleImage} alt="Tickle" />
      <BottomBar relayData={tickle} />
      <NavButtons>
        <button
          onClick={() =>
            goToPreviousTickle(allRelay, tickleId, relayId, navigate)
          }
        ></button>
        <button
          onClick={() => goToNextTickle(allRelay, tickleId, relayId, navigate)}
        ></button>
      </NavButtons>
    </RelayContainer>
  );
};

export default Relay;

const RelayContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
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
    padding: 0;
    cursor: pointer;
    z-index: 2;
  }
`;
