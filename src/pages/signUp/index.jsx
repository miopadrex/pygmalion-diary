import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button.jsx";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { TypographyH1 } from "@/components/ui/typography.jsx";
import { useSignUpApi } from "@/pages/signUp/api.js";
import { ROUTE_PATH } from "@/route/index.js";

const formSchema = z
	.object({
		email: z.string().email("올바른 이메일 주소를 입력해주세요"),
		password: z.string().min(1, "비밀번호를 입력해주세요"),
		passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요"),
		nickName: z.string().min(1, "닉네임을 입력해주세요"),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "비밀번호가 일치하지 않습니다",
		path: ["passwordConfirm"], // 에러가 표시될 필드
	});

export default function SignUpPage() {
	const navigate = useNavigate();

	const { mutate } = useSignUpApi();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			passwordConfirm: "",
			nickName: "",
		},
	});

	const onSubmit = (value) => {
		const { email, password } = value || {};
		const payload = {
			email,
			password,
		};

		console.log(payload);

		mutate(payload);
	};

	const onClickLogin = () => {
		navigate(ROUTE_PATH.LOGIN);
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-svh px-4">
			<div>
				<TypographyH1>회원가입</TypographyH1>
			</div>
			<div className="mt-[40px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-[15px] w-[300px]">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center">
											<FormLabel className="w-[120px]">이메일</FormLabel>
											<div className="flex flex-col gap-2 w-full">
												<FormControl>
													<Input placeholder="이메일을 입력하세요" {...field} />
												</FormControl>
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center">
											<FormLabel className="w-[120px]">비밀번호</FormLabel>
											<div className="flex flex-col gap-2 w-full">
												<FormControl>
													<Input
														type="password"
														placeholder="비밀번호를 입력하세요"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="passwordConfirm"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center">
											<FormLabel className="w-[120px]">비밀번호 확인</FormLabel>
											<div className="flex flex-col gap-2 w-full">
												<FormControl>
													<Input
														type="passwordConfirm"
														placeholder="비밀번호를 입력하세요"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="nickName"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center">
											<FormLabel className="w-[120px]">닉네임</FormLabel>
											<div className="flex flex-col gap-2 w-full">
												<FormControl>
													<Input
														type="nickName"
														placeholder="닉네임을 입력하세요"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</div>
										</div>
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" className="mt-[40px] w-full">
							회원가입
						</Button>
					</form>
				</Form>
			</div>
			<div className="mt-[10px]">
				<Button variant="link" onClick={onClickLogin}>
					로그인 페이지로 이동
				</Button>
			</div>
		</div>
	);
}
