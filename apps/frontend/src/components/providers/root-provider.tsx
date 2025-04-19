import SideBarContainer from "./sidebar-provider/sidebar-provider";
import { ThemeProvider } from "./theme-provider/theme-provider";

export default function RootProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<SideBarContainer>{children}</SideBarContainer>
		</ThemeProvider>
	);
}
