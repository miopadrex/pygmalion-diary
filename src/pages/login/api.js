// 쿼리 키 상수
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authApis } from "@/apis/axios/auth/api.js";
import { userProfileKeys } from "@/apis/queryKeys/auth.js";
import { setAuthToken } from "@/lib/storage.js";
import { ROUTE_PATH } from "@/route/index.js";

// 로그인 Mutation
export const useSignInApi = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApis.signIn,
		meta: {
			loadingText: "로그인중...",
		},
		onSuccess: (data) => {
			toast.success("로그인에 성공하였습니다.");

			// 토큰 저장
			setAuthToken(data.access_token);

			queryClient.invalidateQueries({ queryKey: userProfileKeys.all });

			// 홈 페이지로 리다이렉트
			navigate(ROUTE_PATH.HOME);
		},
		onError: (error) => {
			// 비즈니스 로직 에러만 처리 (HTTP 에러는 axios에서 처리됨)
			if (error.response?.status === 400) {
				toast.error("아이디 또는 비밀번호가 틀렸습니다.");
			}
		},
	});
};
