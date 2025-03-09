import React from "react";

const HorizontalLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className={`w-full h-screen bg-background relative`}>
			<div
				className={`w-full h-16 border-r-[1px] border-r-card sticky top-0 bg-background z-10 border-b-[1px] border-b-card`}
			>
				Header
			</div>
			<div
				className={`w-full h-auto px-5 py-2 border-r-[1px] border-r-card sticky top-0 bg-background z-10 border-b-[1px] border-b-card`}
			>
				Sidebar
			</div>
			<div className={`w-full h-auto border-b-[1px] border-b-card`}>
				{children}
			</div>
			<div
				className={`w-full h-auto p-5 border-r-[1px] border-r-card sticky top-0 bg-background z-10`}
			>
				Footer
			</div>
		</main>
	);
};

export default HorizontalLayout;
