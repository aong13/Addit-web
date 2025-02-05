import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "../components/Carousel";
import { response_hot } from "../assets/DummyData_home";
import Collaborators from "../components/Collaborators";
import logo from "../assets/logo_temp.png";
import ImageRowGrid from "../components/ImageRowGrid";

const Home = () => {
  const [data, setData] = useState([]);
  const [focusedRelayId, setFocusedRelayId] = useState(null);
  const [selectedTickleId, setSelectedTickleId] = useState(null);

  // ImageRow에서 이미지 선택 시 tickleId 업데이트
  const handleImageSelect = (tickleId) => {
    setSelectedTickleId(tickleId);
  };

  useEffect(() => {
    setData(response_hot.data.relays); // 데이터 로드
  }, []);

  useEffect(() => {
    if (data.length > 0 && !focusedRelayId) {
      setFocusedRelayId(data[0]?.relayId); // 초기 포커스 설정
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
      <div>
        <Title>
          인기 태그
          <Highlight> #기숙사</Highlight>
          <br />
          릴레이에 동참해보세요
        </Title>
      </div>
      <Carousel
        data={data}
        onFocusChange={setFocusedRelayId}
        selectedTickleId={selectedTickleId}
      />
      <Collaborators
        count={currentRelay.memberCount}
        images={currentRelay.memberImages}
      />
      <ContentTitle>
        어떻게 자취까지 사랑하겠어 긱사를 사랑하는것임
      </ContentTitle>
      <BottomContainer>
        <ImageRowGrid
          data={currentRelay?.tickles}
          onImageSelect={handleImageSelect}
        />
        <Text1>현재 참여중인 컨텐츠</Text1>
        <Text2>더 많은 컨텐츠를 확인하려면?</Text2>
        <div>
          <Button>릴레이 보러가기</Button>
          <Button>릴레이 만들기 </Button>
        </div>
      </BottomContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  text-align: center;
  justify-content: center;
  height: 100vh;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  img {
    height: 26px;
    width: auto;
  }
`;

const Title = styled.span`
  color: #222222;
  font-size: 16px;
  font-weight: 600;
`;

const Highlight = styled.span`
  color: #4574ec;
  font-weight: bold;
`;

const Tabbar = styled.div`
  display: inline-block;
  width: auto;
  border-bottom: 2px solid #4574ec;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #222;
  margin: 20px auto;
`;

const ContentTitle = styled.p`
  width: 200px;
  margin: 10px auto;
  color: #545454;
  font-size: 16px;
  font-weight: 600;
  margin: 30px auto;
`;

const Text1 = styled.p`
  color: #545454;
  font-size: 14px;
  font-weight: 600;
`;

const Text2 = styled.p`
  margin-top: 10px;
  color: #545454;
  font-size: 8px;
  font-weight: 400;
`;

const BottomContainer = styled.div`
  background-color: #e7edff;
  height: 598px;
  padding: 20px;
`;

const Button = styled.button`
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  background-color: #7fa3ff;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border: transparent;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5e8cde;
  }
`;
