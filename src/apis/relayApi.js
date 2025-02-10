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
 * 티클 추가 api
 * @param {Object} tickleData - 서버에 전송할 티클 데이터 객체
 * @param {string} tickleData.relayId - 티클이 속한 릴레이의 ID
 * @param {string} tickleData.tickleDescription - 티클의 설명
 * @param {string} tickleData.userImage - 사용자의 이미지 URL
 * @param {string} tickleData.userName - 사용자의 이름
 * @returns {Promise<Object>} 서버 응답 데이터
 */
export const addTickleData = async (tickleData) => {
  try {
    const response = await api.post("/api/tickles", tickleData);
    return response.data;
  } catch (error) {
    console.error("티클 추가 실패:", error);
    throw error;
  }
};

/**
 * 릴레이 추가 api
 * @param {Object} relayData - 서버에 전송할 릴레이 데이터 객체
 * @param {string} relayData.title - 릴레이의 제목
 * @param {Array<string>} relayData.tags - 릴레이의 태그들
 * @param {string} relayData.relayDescription - 릴레이의 설명
 * @param {string} relayData.tickleDescription - 티클의 설명
 * @param {string} relayData.userImage - 사용자의 이미지 URL
 * @param {string} relayData.userName - 사용자의 이름
 * @returns {Promise<Object>} 서버 응답 데이터
 */
export const postRelayData = async (relayData) => {
  try {
    const response = await api.post("/api/mvp/relays", relayData);
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
