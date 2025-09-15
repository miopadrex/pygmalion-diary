import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authApis } from "@/apis/axios/auth/api.js";
import { userProfileKeys } from "@/apis/queryKeys/auth.js";
import { setAuthToken } from "@/lib/storage.js";
import { ROUTE_PATH } from "@/route/index.js";

export const useSignUpApi = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApis.signUp,
		meta: {
			loadingText: "회원가입중...",
		},
		onSuccess: (data) => {
			const { user } = data || {};

			toast.success("회원가입에 성공하였습니다.");

			// currentUser에 모든 사용자 정보 저장
			queryClient.invalidateQueries({ queryKey: userProfileKeys.all });

			// 토큰 저장
			setAuthToken(data.access_token);

			// 홈 페이지로 리다이렉트
			navigate(ROUTE_PATH.HOME);
		},
		onError: (error) => {},
	});
};
