import { getAuthToken } from "./storage.js";

// 토큰 확인으로 로그인 상태 체크
export const isAuthenticated = () => {
	const token = getAuthToken();
	return !!token;
};