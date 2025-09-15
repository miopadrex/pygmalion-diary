import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TypographyH1 } from "@/components/ui/typography.jsx";
import { useSignInApi } from "@/pages/login/api.js";
import { ROUTE_PATH } from "@/route/index.js";

const formSchema = z.object({
	email: z.email("올바른 이메일 주소를 입력해주세요"),
	password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export default function LoginPage() {
	const navigate = useNavigate();

	const { mutate } = useSignInApi();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
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

	const onClickSignUp = () => {
		navigate(ROUTE_PATH.SIGN_UP);
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-svh px-4">
			<div>
				<TypographyH1>로그인</TypographyH1>
			</div>
			<div className="mt-[40px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-[10px] w-[300px]">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>이메일</FormLabel>
										<FormControl>
											<Input placeholder="이메일을 입력하세요" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>비밀번호</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="비밀번호를 입력하세요"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" className="mt-[40px] w-full">
							로그인
						</Button>
					</form>
				</Form>
			</div>
			<div className="mt-[10px]">
				<Button variant="link" onClick={onClickSignUp}>
					회원가입
				</Button>
			</div>
		</div>
	);
}
