import { createBrowserRouter, redirect } from "react-router";
import { isAuthenticated } from "@/lib/auth.js";
import NotFoundPage from "@/pages/error/404.jsx";
import HomePage from "@/pages/home/index.jsx";
import LoginPage from "@/pages/login/index.jsx";
import SignUpPage from "@/pages/signUp/index.jsx";
import GuestGuard from "@/route/GuestGuard.jsx";
import { ROUTE_PATH } from "@/route/index.js";
import UserGuard from "@/route/UserGuard.jsx";

// Router 설정
const router = createBrowserRouter([
	{
		path: "/",
		loader: () =>
			isAuthenticated()
				? redirect(ROUTE_PATH.HOME)
				: redirect(ROUTE_PATH.LOGIN),
	},
	{
		path: "/",
		Component: GuestGuard, // Guest 전용 레이아웃
		children: [
			{
				path: "login",
				Component: LoginPage,
			},
			{
				path: "sign-up",
				Component: SignUpPage,
			},
		],
	},
	{
		path: "/",
		Component: UserGuard, // User 전용 레이아웃
		children: [
			{
				path: "home",
				Component: HomePage,
			},
		],
	},
	{
		path: "/404",
		Component: NotFoundPage,
	},
	{
		path: "*",
		Component: NotFoundPage,
	},
]);

export { router };
