import React from "react";
import AppRouter from "./router";
import styled from "styled-components";
import "./reset.css";

function App() {
  return (
    <AppContainer>
      <AppRouter />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100%;
  max-width: 480px; /* 최대 화면 크기 */
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0px 20px;
  min-height: 100vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default App;
