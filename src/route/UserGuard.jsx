import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "@/lib/auth.js";
import { ROUTE_PATH } from "@/route/index.js";

export default function UserGuard() {
	if (!isAuthenticated()) {
		return <Navigate to={ROUTE_PATH.LOGIN} replace />;
	}
	return <Outlet />; // 인증된 사용자만 통과
}
