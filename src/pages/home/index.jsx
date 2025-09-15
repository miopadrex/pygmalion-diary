import { useLogoutApi, useMyProfileApi } from "@/apis/hooks/auth.js";

export default function HomePage() {
	const { mutate: logoutMutate } = useLogoutApi();

	const { data: profile } = useMyProfileApi();

	const handleLogout = () => {
		logoutMutate();
	};

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">홈 페이지</h1>
			<p className="mb-4">로그인 성공! 여기는 홈 페이지입니다.</p>
			<p>{profile?.nickname}</p>
			<button
				type="button"
				onClick={handleLogout}
				className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
			>
				로그아웃
			</button>
		</div>
	);
}
