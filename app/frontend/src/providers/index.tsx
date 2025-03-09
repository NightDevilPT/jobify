import React from "react";
import { ThemeProvider } from "./theme-provider";
import { RootLayoutProvider } from "./layout-provider";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<RootLayoutProvider>{children}</RootLayoutProvider>
		</ThemeProvider>
	);
};

export default RootProvider;
