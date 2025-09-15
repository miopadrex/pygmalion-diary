// localStorage 유틸리티 함수들

// 토큰 키 상수
export const STORAGE_KEYS = {
	PYGMALION_TOKEN: "pygmalion-diary-token",
};

// localStorage에서 값 가져오기
export const getStorageItem = (key) => {
	try {
		return localStorage.getItem(key);
	} catch (error) {
		console.error(`Failed to get item from localStorage: ${key}`, error);
		return null;
	}
};

// localStorage에 값 저장하기
export const setStorageItem = (key, value) => {
	try {
		localStorage.setItem(key, value);
		return true;
	} catch (error) {
		console.error(`Failed to set item to localStorage: ${key}`, error);
		return false;
	}
};

// localStorage에서 값 삭제하기
export const removeStorageItem = (key) => {
	try {
		localStorage.removeItem(key);
		return true;
	} catch (error) {
		console.error(`Failed to remove item from localStorage: ${key}`, error);
		return false;
	}
};

// 모든 토큰 삭제 (로그아웃용)
export const clearAllTokens = () => {
	removeStorageItem(STORAGE_KEYS.PYGMALION_TOKEN);
};

// 토큰 관련 헬퍼 함수들
export const getAuthToken = () => getStorageItem(STORAGE_KEYS.PYGMALION_TOKEN);
export const setAuthToken = (token) =>
	setStorageItem(STORAGE_KEYS.PYGMALION_TOKEN, token);
