"use client";

import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReusableDropdownProps<T> {
	trigger: React.ReactNode;
	menuItems: T[];
	renderItems: (item: T, index: number) => React.ReactNode;
}

const ReusableDropdown = <T,>({
	trigger,
	menuItems,
	renderItems,
}: ReusableDropdownProps<T>) => {
	const [open, setOpen] = React.useState(false);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent>
				{menuItems.map((item, index) => (
					<DropdownMenuItem key={index}>
						{renderItems(item, index)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ReusableDropdown;
