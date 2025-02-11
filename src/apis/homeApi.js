import api from "./api";

export const fetchHomeData = async (size = 5) => {
  try {
    const response = await api.get(`/api/mvp/main`, {
      params: { size },
    });
    return response.data;
  } catch (error) {
    console.error("홈 화면 데이터 불러오기 실패:", error);
    throw error;
  }
};
