"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import ReusableDropdown from "../jb-dropdown";

export function ThemeToggle() {
	const { setTheme } = useTheme();

	const menuItems: { label: string; value: string }[] = [
		{ label: "Light", value: "light" },
		{ label: "Dark", value: "dark" },
		{ label: "System", value: "system" },
	];

	return (
		<ReusableDropdown
			trigger={
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			}
			menuItems={menuItems}
			renderItems={(item: { label: string; value: string }) => (
				<button
					onClick={() => setTheme(item.value)}
					className="w-full text-left"
				>
					{item.label}
				</button>
			)}
		/>
	);
}
