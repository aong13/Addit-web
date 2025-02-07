import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import { response_hot } from "../assets/DummyData_home";
import Collaborators from "../components/Collaborators";
import logo from "../assets/logo.svg";
import ImageRowGrid from "../components/ImageRowGrid";
import plusIcon from "../assets/icons/plus_blue.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

const Home = () => {
  const [data, setData] = useState([]);
  const [focusedRelayId, setFocusedRelayId] = useState(null);
  const [selectedTickleId, setSelectedTickleId] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/upload");
  };

  const handleImageSelect = (tickleId) => {
    setSelectedTickleId(tickleId);
  };

  useEffect(() => {
    setData(response_hot.data.relays);
  }, []);

  useEffect(() => {
    if (data.length > 0 && !focusedRelayId) {
      setFocusedRelayId(data[0]?.relayId);
    }
  }, [data, focusedRelayId]);

  const currentRelay = focusedRelayId
    ? data.find((relay) => relay.relayId === focusedRelayId)
    : null;

  if (!currentRelay) {
    return <div></div>; //추후 로딩처리
  }

  return (
    <Container>
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>
      <Tabbar>실시간</Tabbar>
      <Title>
        인기 태그
        <strong> #{currentRelay.tag}</strong>
        <br />
        릴레이에 동참해보세요
      </Title>
      <Carousel
        data={data}
        onFocusChange={setFocusedRelayId}
        selectedTickleId={selectedTickleId}
      />
      <ContentTitle>{currentRelay.relayTitle}</ContentTitle>
      <Collaborators
        count={currentRelay.memberCount}
        images={currentRelay.memberImages}
      />
      <BottomSection>
        <ImageRowGrid
          data={currentRelay?.tickles}
          onImageSelect={handleImageSelect}
        />
        <Text>새롭게 릴레이를 추가해보세요!</Text>

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
`;

const BottomSection = styled.div`
  margin-top: 20px;
  box-sizing: border-box;
  width: 100%;
  background-color: #e7edff;
  padding: 0px 10px; // 화면 가장자리 패딩
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
const Logo = styled.div`
  img {
    height: 26px;
    width: auto;
  }
`;

const Tabbar = styled.h1`
  display: inline-block;
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
  margin: 14px 0;
`;

const Text = styled.p`
  margin-top: 20px;
  color: #7fa3ff;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const CopyRight = styled.p`
  color: #7fa3ff;
  font-size: 10px;
  margin-top: 50px;
  text-align: center;
`;
