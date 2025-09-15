import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "@/lib/auth.js";
import { ROUTE_PATH } from "@/route/index.js";

export default function GuestGuard() {
	if (isAuthenticated()) {
		return <Navigate to={ROUTE_PATH.HOME} replace />;
	}
	return <Outlet />;
}
