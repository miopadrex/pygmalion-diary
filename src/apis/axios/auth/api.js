import { apiClient } from "@/apis/axios/axios.config.js";

const authApis = {
	// 회원가입
	signUp: async ({ email, password, nickname }) => {
		return await apiClient.post("/auth/v1/signup", {
			email,
			password,
			data: { nickname },
		});
	},

	// 로그인
	signIn: async ({ email, password }) => {
		return await apiClient.post("/auth/v1/token?grant_type=password", {
			email,
			password,
		});
	},
	// 로그아웃
	logout: async () => {
		return apiClient.post("/auth/v1/logout");
	},
	// 내 프로필 조회
	getMyProfile: async () => {
		return await apiClient.get("/rest/v1/user_profiles?select=*");
	},
	// 프로필 업데이트
	updateProfile: async ({ userId, updates }) => {
		return await apiClient.patch(
			`/rest/v1/user_profiles?id=eq.${userId}`,
			updates,
			{
				headers: {
					Prefer: "return=representation",
				},
			},
		);
	},
};

export { authApis };
