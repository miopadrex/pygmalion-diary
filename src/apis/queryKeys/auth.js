// 쿼리 키 상수
const userProfileKeys = {
	all: ["user_profiles"],
	my: () => [...userProfileKeys.all, "my"],
};

export { userProfileKeys };
