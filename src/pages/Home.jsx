import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "../components/carousel/Carousel";
import Collaborators from "../components/Collaborators";
import ImageRowGrid from "../components/ImageRowGrid";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import logo from "../assets/logo.svg";
import plusIcon from "../assets/icons/plus_blue.svg";
import useRelayStore from "../store/useRelayStore";

const Home = () => {
  const { relays, focusedRelayId, setFocusedRelayId } = useRelayStore();
  const [selectedTickleId, setSelectedTickled] = useState();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/upload/relay");
  };

  const handleImageSelect = (tickleId) => {
    setSelectedTickled(tickleId);
  };

  const currentRelay = focusedRelayId
    ? relays.find((relay) => relay.relay.relayId === focusedRelayId)
    : null;

  return (
    <Container>
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>
      <Tabbar>실시간</Tabbar>

      <Title>
        인기 태그
        <strong> #{currentRelay?.relay.tags[0]}</strong>
        <br />
        릴레이에 동참해보세요
      </Title>
      <Carousel
        onFocusChange={setFocusedRelayId}
        selectedTickleId={selectedTickleId}
      />

      {currentRelay && (
        <>
          <ContentTitle>{currentRelay.relay.title}</ContentTitle>
          <Collaborators
            count={currentRelay.relay.totalTickleCount}
            images={currentRelay.relay.contributorImages}
          />
        </>
      )}
      <div style={{ height: "20px" }} />
      <BottomSection>
        <ImageRowGrid
          data={currentRelay?.tickle || []}
          onImageSelect={handleImageSelect}
        />
        <p>새롭게 릴레이를 추가해보세요!</p>
        <Button text="릴레이 만들기" icon={plusIcon} onClick={handleClick} />
        <CopyRight>copyright 2025. Addit. All rights reserved Pozzle</CopyRight>
      </BottomSection>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const BottomSection = styled.div`
  width: 100%;
  background-color: rgb(231, 237, 255);
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  p {
    color: #7fa3ff;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    margin-top: 50px;
  }
`;

const Logo = styled.div`
  img {
    height: 26px;
    width: auto;
  }
`;

const Tabbar = styled.h1`
  border-bottom: 2px solid #4574ec;
  color: #222;
  font-size: 16px;
  padding: 10px;
  margin: 16px 0;
`;

const Title = styled.h1`
  color: #222222;
  font-size: 16px;
  text-align: center;
  margin: 16px 0 30px;
  strong {
    color: #4574ec;
  }
`;

const ContentTitle = styled.h1`
  width: 200px;
  color: #545454;
  font-size: 16px;
  text-align: center;
  margin: 18px 0;
`;

const CopyRight = styled.span`
  color: #7fa3ff;
  font-size: 10px;
  margin-top: 50px;
  text-align: center;
`;
