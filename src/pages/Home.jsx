import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import { response_hot } from "../assets/DummyData_home";
import Collaborators from "../components/Collaborators";
import logo from "../assets/logo_temp.png";
import ImageRowGrid from "../components/ImageRowGrid";
import goIcon from "../assets/arrow_go.svg";
import plusIcon from "../assets/plus.svg";

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
    return <div>Loading...</div>;
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
      <div style={{ height: "20px" }} />
      <Collaborators
        count={currentRelay.memberCount}
        images={currentRelay.memberImages}
      />

      <ContentTitle>{currentRelay.relayTitle}</ContentTitle>

      <BottomContainer>
        <ImageRowGrid
          data={currentRelay?.tickles}
          onImageSelect={handleImageSelect}
        />
        <Text1>현재 릴레이 참여중인 컨텐츠</Text1>
        <Text2>더 많은 컨텐츠를 확인하려면?</Text2>

        <ButtonContainer>
          <Button text="릴레이 보러가기" icon={goIcon} />
          <Button text="릴레이 만들기" icon={plusIcon} />
        </ButtonContainer>

        <CopyRight>copyright 2025. Addit. All rights reserved Pozzle</CopyRight>
      </BottomContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
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
  margin-bottom: 20px;
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
  margin: 14px 0 30px;
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

const BottomContainer = styled.div`
  background-color: #e7edff;
  padding: 40px 10px; //화면 가장자리 패딩
`;

const ButtonContainer = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 0 20px;
`;

const CopyRight = styled.p`
  color: #7fa3ff;
  font-size: 10px;
  font-weight: 400;
  margin-top: 50px;
  text-align: center;
`;

const StyledButton = styled.button`
  display: flex;
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 10px 0;
  background-color: #7fa3ff;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
  border: transparent;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 200px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #5e8cde;
  }
`;

const Icon = styled.img`
  margin-left: 10px;
  width: 20px;
  height: 20px;
`;
