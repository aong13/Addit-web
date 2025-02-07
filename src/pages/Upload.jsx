import React from "react";
import Header from "../components/layout/Header";
import styled from "styled-components";
const Upload = () => {
  return (
    <Container>
      <Header title={"릴레이만들기"} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
`;
export default Upload;
