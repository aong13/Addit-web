import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import { response_hot } from "../assets/DummyData_home";
import Collaborators from "../components/Collaborators";
import logo from "../assets/logo.svg";
import ImageRowGrid from "../components/ImageRowGrid";

import plusIcon from "../assets/icons/plus_blue.svg";

const Button = ({ text, icon }) => {
  return (
    <StyledButton>
      {text}
      <Icon src={icon} />
    </StyledButton>
  );
};

const Home = () => {
  const [data, setData] = useState([]);
  const [focusedRelayId, setFocusedRelayId] = useState(null);
  const [selectedTickleId, setSelectedTickleId] = useState(null);
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
    return <div>Loading</div>;
  }

  return (
    <Container>
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>
      <Tabbar>실시간</Tabbar>
      <Title>
        인기 태그
        <Highlight> #{currentRelay.tag}</Highlight>
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
        <BottomSection>
          <ImageRowGrid
            data={currentRelay?.tickles}
            onImageSelect={handleImageSelect}
          />
          <Text1>현재 릴레이 참여중인 컨텐츠</Text1>
          <Text2>더 많은 컨텐츠를 확인하려면?</Text2>

          <Button text="릴레이 만들기" icon={plusIcon} />
        </BottomSection>

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

const Tabbar = styled.div`
  display: inline-block;
  border-bottom: 2px solid #4574ec;
  color: #222;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  margin: 16px 0;
`;

const Title = styled.span`
  color: #222222;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin: 16px 0 30px;
`;

const Highlight = styled.span`
  color: #4574ec;
  font-weight: bold;
`;

const ContentTitle = styled.p`
  width: 200px;
  color: #545454;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin: 14px 0;
`;

const Text1 = styled.p`
  margin-top: 20px;
  color: #545454;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;

const Text2 = styled.p`
  margin-top: 6px;
  color: #545454;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
`;

const CopyRight = styled.p`
  color: #7fa3ff;
  font-size: 10px;
  font-weight: 400;
  margin-top: 50px;
  text-align: center;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  display: flex;
  color: #7fa3ff;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 0;
  background-color: transparent;
  border: 1px solid #7fa3ff;
  border-radius: 24px;

  justify-content: center;
  align-items: center;

  cursor: pointer;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #ffffff20;
  }
`;

const Icon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: 20px;
`;
