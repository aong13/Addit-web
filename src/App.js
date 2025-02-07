import React from "react";
import AppRouter from "./router";
import styled from "styled-components";
import "./reset.css";
import GlobalStyle from "./styles/fonts/globalStyle"; // 경로에 맞게 수정

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <AppRouter />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-width: 480px; /* 최대 크기 */
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default App;
