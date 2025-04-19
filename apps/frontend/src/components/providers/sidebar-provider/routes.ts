import {
	Home,
	Users,
	FileText,
} from "lucide-react";
import { NavGroup } from "./nav-sidebar";

export const sidebarNavGroups: NavGroup[] = [
	{
		items: [
			{
				title: "Dashboard",
				url: "/",
				icon: Home,
				isActive: true,
			},
			{
				title: "Users",
				icon: Users,
				items: [
					{
						title: "All Users",
						url: "/users",
						isActive: false,
					},
					{
						title: "Roles",
						url: "/users/roles",
					},
					{
						title: "Permissions",
						url: "/users/permissions",
					},
				],
			},
			{
				title: "Content",
				icon: FileText,
				items: [
					{
						title: "Posts",
						url: "/content/posts",
					},
					{
						title: "Pages",
						url: "/content/pages",
					},
					{
						title: "Media",
						url: "/content/media",
					},
				],
			},
		],
	},
];
