export const EnvConfig = {
	baseUrl:
		process.env.NEXT_PUBLIC_ENV === "dev"
			? process.env.NEXT_PUBLIC_DEV_BASE_URL
			: process.env.NEXT_PUBLIC_PROD_BASE_URL,
};
