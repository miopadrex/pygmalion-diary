import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authApis } from "@/apis/axios/auth/api.js";
import { userProfileKeys } from "@/apis/queryKeys/auth.js";
import { clearAllTokens, setAuthToken } from "@/lib/storage.js";
import { ROUTE_PATH } from "@/route/index.js";

const useLogoutApi = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApis.logout,
		onSuccess: (data) => {
			toast.success("로그아웃 되었습니다");

			// 토큰 삭제
			clearAllTokens();

			queryClient.invalidateQueries({ queryKey: userProfileKeys.all });

			// 홈 페이지로 리다이렉트
			navigate(ROUTE_PATH.LOGIN);
		},
		onError: (error) => {},
	});
};

const useMyProfileApi = () => {
	return useQuery({
		queryKey: userProfileKeys.my(),
		queryFn: authApis.getMyProfile,
		staleTime: 1000 * 60 * 5, // 5분간 캐시
		select: (data) => {
			return data?.[0] || null;
		}, // 배열에서 첫 번째 요소만 반환
		meta: {
			skipLoading: true,
		},
	});
};

export { useLogoutApi, useMyProfileApi };
