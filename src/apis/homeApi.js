import api from "./api";

let cnt = 0;
export const fetchHomeData = async (size = 5, excludeIds = []) => {
  try {
    const response = await api.get(`/api/mvp/main`, {
      params: { size },
      headers: {
        "Exclude-Ids": excludeIds.join(","),
      },
    });
    console.log({ cnt }, "!!");
    cnt++;
    return response.data;
  } catch (error) {
    console.error("홈 화면 데이터 불러오기 실패:", error);
    throw error;
  }
};
