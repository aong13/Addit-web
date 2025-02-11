import React from "react";
import AppRouter from "./router";
import styled from "styled-components";
import "./reset.css";
import GlobalStyle from "./styles/fonts/globalStyle"; // 경로에 맞게 수정
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import useToastStore from "./store/useToastStore";

function App() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <AppContainer>
      <GlobalStyle />
      <AppRouter />
      <Modal />

      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id} message={toast.message} />
      ))}
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
