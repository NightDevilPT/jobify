"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";

const NotFoundPage = () => {
	const router = useRouter();

	return (
		<div
			className={`w-full h-screen bg-gradient-to-tr text-white flex flex-col justify-center items-center space-y-6`}
		>
			<div className="text-center">
				<h1
					className={`text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400 animate-pulse`}
				>
					404
				</h1>
				<p className={`text-2xl mt-4 text-gray-500`}>
					Oops! We can&apos;t seem to find the page you&apos;re
					looking for.
				</p>
				<span className={`text-sm text-gray-500`}>
					The resource you&apos;re trying to access is unavailable or
					does not exist.
				</span>
			</div>

			{/* Back to Home Button */}
			<Button
				onClick={() => router.push("/")}
				className={`flex items-center rounded-md bg-gradient-to-r from-primary to-green-400 text-white dark:text-secondary font-semibold hover:scale-105 transition-transform`}
			>
				<House size={20} />
				<span>Go Back Home</span>
			</Button>
		</div>
	);
};

export default NotFoundPage;
