import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import RelayHeader from "./RelayHeader";
import BottomBar from "./BottomBar";
import styled from "styled-components";
import { getTicklesData } from "../../apis/relayApi";

const RelayLayout = () => {
  const [relayData, setRelayData] = useState(null);
  const { relayId, tickleId } = useParams();

  useEffect(() => {
    const fetchRelayData = async () => {
      try {
        const response = await getTicklesData(tickleId);
        setRelayData(response.data);
      } catch (error) {
        console.error("Error fetching relay data", error);
      }
    };

    if (tickleId) {
      fetchRelayData();
    }
  }, [tickleId]);

  return (
    <Container>
      <RelayHeader title={relayData?.relayTitle} />
      <Outlet context={{ relayData }} />
      <BottomBar relayData={relayData} />
    </Container>
  );
};

export default RelayLayout;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
`;
