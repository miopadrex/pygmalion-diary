// api/config.js
import axios from "axios";
import { toast } from "sonner";
import { clearAllTokens, getAuthToken } from "@/lib/storage.js";
import { ROUTE_PATH } from "@/route/index.js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Axios 인스턴스 생성
export const apiClient = axios.create({
	baseURL: SUPABASE_URL,
	headers: {
		apikey: SUPABASE_ANON_KEY,
		"Content-Type": "application/json",
	},
});

// 요청 인터셉터 (토큰 자동 추가)
apiClient.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
	(response) => response.data,
	(error) => {
		const status = error.response?.status;

		// 401: 인증 에러 - 자동 로그아웃
		if (status === 401) {
			clearAllTokens();
			window.location.href = ROUTE_PATH.LOGIN;
			return Promise.reject(error);
		}

		// 403: 권한 에러
		if (status === 403) {
			toast.error("접근 권한이 없습니다.");
		}

		// 404: 리소스 없음
		if (status === 404) {
			toast.error("요청한 리소스를 찾을 수 없습니다.");
		}

		// 500대: 서버 에러
		if (status >= 500) {
			toast.error("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
		}

		// 네트워크 에러
		if (!error.response) {
			toast.error("네트워크 연결을 확인해주세요.");
		}

		return Promise.reject(error);
	},
);
