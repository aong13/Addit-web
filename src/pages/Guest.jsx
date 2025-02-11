import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuestLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userToken");
    if (isLoggedIn) {
      navigate("/home"); // 로그인 상태라면 홈으로 이동
    }
  }, []);

  return (
    <div>
      <h1>게스트 로그인 화면</h1>
      <button
        onClick={() => {
          localStorage.setItem("userToken", "guest"); // 로그인 정보 저장
          navigate("/home");
        }}
      >
        게스트 로그인
      </button>
    </div>
  );
};

export default GuestLogin;
