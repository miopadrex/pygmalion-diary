import {
	useIsFetching,
	useIsMutating,
	useQueryClient,
} from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { LoadingOverlay } from "@/components/ui/loading.jsx";

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
	const queryClient = useQueryClient();
	const isMutating = useIsMutating();
	const isFetching = useIsFetching();

	// 수동 로딩 상태 관리
	const [manualLoading, setManualLoading] = useState(false);
	const [manualLoadingText, setManualLoadingText] = useState("로딩 중...");

	// skipLoading이 true인 mutation/query는 제외
	const isMutatingWithoutSkip = useIsMutating({
		predicate: (mutation) => !mutation.options?.meta?.skipLoading,
	});
	const isFetchingWithoutSkip = useIsFetching({
		predicate: (query) => !query.options?.meta?.skipLoading,
	});

	// React Query 로딩 또는 수동 로딩
	const reactQueryLoading =
		isMutatingWithoutSkip > 0 || isFetchingWithoutSkip > 0;
	const isLoading = reactQueryLoading || manualLoading;

	// 수동 로딩 제어 함수들
	const showLoading = (text = "로딩 중...") => {
		setManualLoadingText(text);
		setManualLoading(true);
	};

	const hideLoading = () => {
		setManualLoading(false);
	};

	// 현재 실행 중인 mutation/query의 loadingText 가져오기
	const getLoadingText = () => {
		// 수동 로딩이 활성화되어 있으면 수동 텍스트 우선
		if (manualLoading) {
			return manualLoadingText;
		}

		const mutations = queryClient.getMutationCache().getAll();
		const queries = queryClient.getQueryCache().getAll();

		// 실행 중이면서 skipLoading이 아닌 mutation 찾기
		const activeMutation = mutations.find(
			(mutation) =>
				mutation.state.status === "pending" &&
				!mutation.options?.meta?.skipLoading,
		);

		if (activeMutation?.options?.meta?.loadingText) {
			return activeMutation.options.meta.loadingText;
		}

		// 실행 중이면서 skipLoading이 아닌 query 찾기
		const activeQuery = queries.find(
			(query) => query.state.isFetching && !query.options?.meta?.skipLoading,
		);

		if (activeQuery?.options?.meta?.loadingText) {
			return activeQuery.options.meta.loadingText;
		}

		return "로딩 중...";
	};

	const value = {
		// 상태값들
		isLoading,
		isMutating: isMutating > 0,
		isFetching: isFetching > 0,
		loadingText: getLoadingText(),
		manualLoading,
		reactQueryLoading,

		// 제어 함수들
		showLoading,
		hideLoading,
	};

	return (
		<LoadingContext value={value}>
			{children}
			<LoadingOverlay isLoading={isLoading} text={getLoadingText()} />
		</LoadingContext>
	);
}

export function useLoading() {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading은 LoadingProvider 내부에서 사용해야 합니다");
	}
	return context;
}
