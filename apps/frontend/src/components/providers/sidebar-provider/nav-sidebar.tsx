"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";

// Define types for better type safety
export type NavItem = {
	title: string;
	url?: string;
	icon?: LucideIcon;
	isActive?: boolean;
	items?: NavSubItem[];
};

export type NavSubItem = {
	title: string;
	url: string;
	isActive?: boolean;
};

export type NavGroup = {
	groupTitle?: string;
	items: NavItem[];
};

interface NavMainProps {
	navGroups: NavGroup[];
}

export function JobifyNavSidebar({ navGroups }: NavMainProps) {
	return (
		<div className="space-y-6">
			{navGroups.map((group, groupIndex) => (
				<SidebarGroup key={group.groupTitle || `group-${groupIndex}`}>
					{group.groupTitle && (
						<SidebarGroupLabel>
							{group.groupTitle}
						</SidebarGroupLabel>
					)}
					<SidebarMenu>
						{group.items.map((item) => (
							<Collapsible
								key={item.title}
								asChild
								defaultOpen={item.isActive}
								className="group/collapsible transition-all duration-300"
							>
								<SidebarMenuItem>
									{item.items ? (
										<>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton
													tooltip={item.title}
												>
													{item.icon && (
														<item.icon className="w-4 h-4" />
													)}
													<span>{item.title}</span>
													<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items.map(
														(subItem) => (
															<SidebarMenuSubItem
																key={
																	subItem.title
																}
															>
																<SidebarMenuSubButton
																	asChild
																>
																	<Link
																		href={
																			subItem.url
																		}
																	>
																		<span>
																			{
																				subItem.title
																			}
																		</span>
																	</Link>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														)
													)}
												</SidebarMenuSub>
											</CollapsibleContent>
										</>
									) : (
										<SidebarMenuButton
											asChild
											tooltip={item.title}
										>
											{item.url ? (
												<Link href={item.url}>
													{item.icon && (
														<item.icon className="w-4 h-4" />
													)}
													<span>{item.title}</span>
												</Link>
											) : (
												<>
													{item.icon && (
														<item.icon className="w-4 h-4" />
													)}
													<span>{item.title}</span>
												</>
											)}
										</SidebarMenuButton>
									)}
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>
			))}
		</div>
	);
}
