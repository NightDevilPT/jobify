import {
	Home,
	Briefcase,
	User,
	Users,
	FileText,
	Bookmark,
	Mail,
	Bell,
	BarChart2,
	Settings,
	FileBadge,
	GraduationCap,
	Clock,
	Star,
	CreditCard,
	Tag,
	ClipboardList,
	MessageSquare
  } from "lucide-react";
  import { NavGroup } from "./nav-sidebar";
  
  export const sidebarNavGroups: NavGroup[] = [
	// Common routes (accessible to all authenticated users)
	{
	  items: [
		{
		  title: "Dashboard",
		  url: "/",
		  icon: Home,
		  isActive: true,
		},
		{
		  title: "Profile",
		  url: "#",
		  icon: User,
		},
		{
		  title: "Messages",
		  url: "#",
		  icon: MessageSquare,
		},
		{
		  title: "Notifications",
		  url: "#",
		  icon: Bell,
		},
		{
		  title: "Settings",
		  url: "#",
		  icon: Settings,
		}
	  ]
	},
  
	// Candidate-specific routes
	{
	  groupTitle: "Candidate",
	  roles: ['CANDIDATE'],
	  items: [
		{
		  title: "Jobs",
		  icon: Briefcase,
		  items: [
			{
			  title: "Browse Jobs",
			  url: "#",
			},
			{
			  title: "Saved Jobs",
			  url: "#",
			  icon: Bookmark,
			},
			{
			  title: "Applications",
			  url: "#",
			}
		  ]
		},
		{
		  title: "Resume",
		  url: "#",
		  icon: FileText,
		},
		{
		  title: "Experience",
		  url: "#",
		  icon: ClipboardList,
		},
		{
		  title: "Education",
		  url: "#",
		  icon: GraduationCap,
		},
		{
		  title: "Interviews",
		  url: "#",
		  icon: Clock,
		},
		{
		  title: "Company Reviews",
		  url: "#",
		  icon: Star,
		}
	  ]
	},
  
	// Recruiter-specific routes
	{
	  groupTitle: "Recruiter",
	  roles: ['RECRUITER'],
	  items: [
		{
		  title: "Jobs",
		  icon: Briefcase,
		  items: [
			{
			  title: "Post a Job",
			  url: "#",
			},
			{
			  title: "Manage Jobs",
			  url: "#",
			},
			{
			  title: "Applications",
			  url: "#",
			}
		  ]
		},
		{
		  title: "Company",
		  url: "#",
		  icon: Users,
		},
		{
		  title: "Candidates",
		  url: "#",
		  icon: User,
		},
		{
		  title: "Schedule Interviews",
		  url: "#",
		  icon: Clock,
		},
		{
		  title: "Analytics",
		  url: "#",
		  icon: BarChart2,
		},
		{
		  title: "Subscriptions",
		  url: "#",
		  icon: CreditCard,
		}
	  ]
	},
  
	// Admin-specific routes
	{
	  groupTitle: "Admin",
	  roles: ['ADMIN'],
	  items: [
		{
		  title: "Users",
		  icon: Users,
		  items: [
			{
			  title: "All Users",
			  url: "#",
			},
			{
			  title: "Roles & Permissions",
			  url: "#",
			}
		  ]
		},
		{
		  title: "Job Tests",
		  icon: FileBadge,
		  url: "#",
		},
		{
		  title: "Tags",
		  icon: Tag,
		  url: "#",
		},
		{
		  title: "System Settings",
		  url: "#",
		  icon: Settings,
		}
	  ]
	}
  ];