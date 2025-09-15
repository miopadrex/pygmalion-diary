import { useNavigate } from "react-router";
import { ROUTE_PATH } from "@/route/index.js";

export default function NotFoundPage() {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate(ROUTE_PATH.HOME);
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center p-8">
				<div className="mb-8">
					<h1 className="text-9xl font-bold text-gray-300">404</h1>
					<h2 className="text-2xl font-semibold text-gray-700 mt-4">
						페이지를 찾을 수 없습니다
					</h2>
					<p className="text-gray-500 mt-2">
						요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
					</p>
				</div>

				<div className="flex gap-4 justify-center">
					<button
						type="button"
						onClick={handleGoBack}
						className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
					>
						이전 페이지
					</button>
					<button
						type="button"
						onClick={handleGoHome}
						className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
					>
						홈으로 이동
					</button>
				</div>
			</div>
		</div>
	);
}