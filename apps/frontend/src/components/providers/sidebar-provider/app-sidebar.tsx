"use client";

import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import { sidebarNavGroups } from "./routes";
import { JobifyNavSidebar } from "./nav-sidebar";
import JobifyLogo from "@/components/molecules/jobify-logo/jobify-logo";
import { JobifyUserNav } from "@/components/molecules/jobify-user/jobify-user";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { state } = useSidebar();
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader
				className={`w-full flex justify-center ${
					state === "collapsed" ? "items-center" : "items-start"
				}`}
			>
				<JobifyLogo />
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<ScrollArea className="w-full h-full">
					<JobifyNavSidebar navGroups={sidebarNavGroups} />
				</ScrollArea>
			</SidebarContent>
			<Separator />
			<SidebarFooter>
				<JobifyUserNav
					user={{
						name: "shadcn",
						email: "m@example.com",
						avatar: "/avatars/shadcn.jpg",
					}}
				/>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
