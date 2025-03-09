"use client";

import HorizontalLayout from "@/components/layouts/horizontal-layout";
import VerticalLayout from "@/components/layouts/vertical-layout";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define layout types
export enum LayoutType {
	VERTICAL = "vertical",
	HORIZONTAL = "horizontal",
}

// Define the shape of the context
interface LayoutContextType {
	layoutType: LayoutType;
	setLayoutType: (type: LayoutType) => void;
}

// Create the context with a default value (will be overridden in the provider)
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Custom hook for consuming layout context
export const useLayout = () => {
	const context = useContext(LayoutContext);
	if (!context) {
		throw new Error("useLayout must be used within a RootLayoutProvider");
	}
	return context;
};

// Provider component
interface LayoutProviderProps {
	children: ReactNode;
}

export const RootLayoutProvider: React.FC<LayoutProviderProps> = ({
	children,
}) => {
	const [layoutType, setLayoutType] = useState<LayoutType>(LayoutType.VERTICAL);
	const switchLayout = {
		[LayoutType.HORIZONTAL]: <HorizontalLayout>{children}</HorizontalLayout>,
		[LayoutType.VERTICAL]: <VerticalLayout>{children}</VerticalLayout>,
	}

	return (
		<LayoutContext.Provider value={{ layoutType, setLayoutType }}>
			{switchLayout[layoutType]}
		</LayoutContext.Provider>
	);
};
