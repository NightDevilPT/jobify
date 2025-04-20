"use client";

import { usePathname } from "next/navigation";
import ReduxProvider from "./redux-provider/redux-provider";
import { ThemeProvider } from "./theme-provider/theme-provider";
import SideBarContainer from "./sidebar-provider/sidebar-provider";

const noSidebarRoutes = [
	"/auth",
	"/auth/login",
	// Add other routes that shouldn't have sidebar
];

export default function RootProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const shouldShowSidebar = !noSidebarRoutes.some((route) =>
		pathname?.startsWith(route)
	);

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<ReduxProvider>
				{shouldShowSidebar ? (
					<SideBarContainer>{children}</SideBarContainer>
				) : (
					children
				)}
			</ReduxProvider>
		</ThemeProvider>
	);
}
