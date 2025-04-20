import { useSidebar } from "@/components/ui/sidebar";
import { Component } from "lucide-react";
import React from "react";

const JobifyLogo = () => {
	const { state } = useSidebar();
	return (
		<div
			className={`w-auto h-auto ${state==='collapsed'?'flex justify-center items-center':'grid grid-cols-[40px,_1fr] place-content-center place-items-center'} gap-3`}
		>
			<Component
				className={`text-primary w-full h-full`}
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
