import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loadingVariants = cva(
	"animate-spin border-solid border-t-transparent rounded-full",
	{
		variants: {
			variant: {
				default: "border-gray-300 border-t-blue-600",
				secondary: "border-gray-300 border-t-gray-600",
				destructive: "border-gray-300 border-t-red-600",
				muted: "border-gray-300 border-t-gray-500",
				accent: "border-gray-300 border-t-purple-600",
				white: "border-gray-400 border-t-white",
			},
			size: {
				sm: "w-4 h-4 border-2",
				default: "w-6 h-6 border-2",
				lg: "w-8 h-8 border-[3px]",
				xl: "w-12 h-12 border-4",
				"2xl": "w-16 h-16 border-4",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const loadingContainerVariants = cva("flex items-center justify-center", {
	variants: {
		fullHeight: {
			true: "min-h-screen",
			false: "",
		},
	},
	defaultVariants: {
		fullHeight: false,
	},
});

function Loading({ className, variant, size, fullHeight, text, ...props }) {
	return (
		<div className={cn(loadingContainerVariants({ fullHeight }))}>
			<div className="flex flex-col items-center gap-2">
				<div
					className={cn(loadingVariants({ variant, size, className }))}
					{...props}
				/>
				{text && (
					<p className="text-sm text-muted-foreground animate-pulse">{text}</p>
				)}
			</div>
		</div>
	);
}

// 전체 화면 오버레이 로딩
function LoadingOverlay({
	isLoading = false,
	text = "로딩 중...",
	variant = "white",
	size = "xl",
	className,
	backdropClassName,
	...props
}) {
	if (!isLoading) return null;

	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center",
				"bg-black/50 backdrop-blur-sm",
				backdropClassName,
			)}
			{...props}
		>
			<div className="flex flex-col items-center gap-4 p-6 bg-background rounded-lg shadow-xl">
				<div className={cn(loadingVariants({ variant, size, className }))} />
				{text && (
					<p className="text-sm text-foreground animate-pulse font-medium">
						{text}
					</p>
				)}
			</div>
		</div>
	);
}

export { Loading, LoadingOverlay, loadingVariants };
