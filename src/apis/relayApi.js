import api from "./api";

export const getTicklesData = async (tickleId) => {
  try {
    const response = await api.get(`/api/mvp/tickles/${tickleId}`); // 경로에 tickleId 포함
    return response.data;
  } catch (error) {
    console.error("티클 데이터 불러오기 실패:", error);
    throw error;
  }
};

/**
 * 티클 추가 API
 * @param {Object} tickleData - 서버에 전송할 티클 데이터 객체
 * @returns {Promise<Object>} 서버 응답 데이터
 */
export const addTickleData = async (tickleData) => {
  const formData = new FormData();

  const requestData = {
    relayId: tickleData.relayId,
    tickleDescription: tickleData.tickleDescription,
    userImage: tickleData.userImage,
    userName: tickleData.userName,
  };

  formData.append("request", JSON.stringify(requestData));

  if (tickleData.file) {
    formData.append("file", tickleData.file);
  }

  try {
    const response = await api.post("/api/mvp/tickles", formData);
    return response.data;
  } catch (error) {
    console.error(" 티클 추가 실패:", error);
    throw error;
  }
};
/**
 * 릴레이 추가 API
 * @param {Object} relayData - 서버에 전송할 릴레이 데이터 객체
 * @returns {Promise<Object>} 서버 응답 데이터
 */
export const postRelayData = async (relayData) => {
  const formData = new FormData();

  const requestData = {
    title: relayData.title,
    tags: relayData.tags,
    relayDescription: relayData.relayDescription,
    tickleDescription: relayData.tickleDescription,
    userImage: relayData.userImage,
    userName: relayData.userName,
  };
  formData.append("request", JSON.stringify(requestData));
  if (relayData.file) {
    formData.append("file", relayData.file);
  }
  try {
    const response = await api.post("/api/mvp/relays", formData);
    return response.data;
  } catch (error) {
    console.error("릴레이 작성 실패:", error);
    throw error;
  }
};

export const getAllRelay = async (relayId) => {
  try {
    const response = await api.get(
      `/api/mvp/relays/${relayId}/tickles/thumbnail`
    );
    return response.data;
  } catch (error) {
    console.error("릴레이 전체 조회 실패 :", error);
    throw error;
  }
};

export const postLikes = async (tickleId) => {
  try {
    const response = await api.get(`/api/mvp/tickles/${tickleId}/like`);
    return response.data;
  } catch (error) {
    console.error("좋아요 추가 실패:", error);
    throw error;
  }
};
