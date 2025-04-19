import { useSidebar } from "@/components/ui/sidebar";
import { Component } from "lucide-react";
import React from "react";

const JobifyLogo = () => {
	const { state } = useSidebar();
	return (
		<div
			className={`w-auto h-auto grid grid-cols-[40px,_1fr] gap-3 place-content-center place-items-center`}
		>
			<Component
				className={`text-primary ${
					state === "collapsed" ? "w-6 h-6" : "w-full h-full"
				}`}
			/>
			{state === "expanded" && (
				<div className="grid grid-cols-1 gap-0">
					<h1 className="text-2xl font-bold">Jobify</h1>
					<p className="text-sm text-muted-foreground">
						Find your dream job
					</p>
				</div>
			)}
		</div>
	);
};

export default JobifyLogo;
