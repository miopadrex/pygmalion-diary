import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { router } from "@/route/router";
import { LoadingProvider } from "./contexts/LoadingContext";

const exceptionErrorCode = [400];

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			staleTime: 5 * 60 * 1000, // 5분
		},
		mutations: {
			retry: false,
		},
	},
	queryCache: new QueryCache({
		onError: (error) => {
			console.log(error, "error");
			const { msg, code } = error?.response?.data || {};

			if (!exceptionErrorCode.includes(code)) {
				toast.error(msg);
			}
		},
	}),
	mutationCache: new MutationCache({
		onError: (error) => {
			const { msg, code } = error?.response?.data || {};

			if (!exceptionErrorCode.includes(code)) {
				toast.error(msg);
			}
		},
	}),
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<LoadingProvider>
				<RouterProvider router={router} />

				<Toaster
					theme="light"
					richColors
					position="top-center"
					toastOptions={{ duration: 2000 }}
					closeButton
				/>
			</LoadingProvider>
		</QueryClientProvider>
	);
}
