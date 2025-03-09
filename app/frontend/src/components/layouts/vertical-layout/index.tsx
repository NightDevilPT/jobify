import React from "react";

const VerticalLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main
			className={`w-full h-screen bg-background grid grid-cols-[320px,_1fr]`}
		>
			<div
				className={`w-full h-full border-r-[1px] border-r-card grid grid-rows-[80px,_1fr,100px]`}
			>
				<div className="border-b-[1px] border-b-card w-full h-full">
					Header Logo
				</div>
				<div className="border-b-[1px] border-b-card w-full h-full">
					Sidebar
				</div>
				<div className="border-b-[1px] border-b-card w-full h-full">
					Sidebar Footer
				</div>
			</div>
			<div className="w-full h-full border-r-[1px] border-r-card grid grid-rows-[80px,_1fr,100px] overflow-y-auto">
				<div className="border-b-[1px] border-b-card w-full h-full">
					Headers
				</div>
				<div className="border-b-[1px] border-b-card w-full h-full relative overflow-y-auto">
					{children}
				</div>
				<div className="border-b-[1px] border-b-card w-full h-full">
					Footer
				</div>
			</div>
		</main>
	);
};

export default VerticalLayout;
