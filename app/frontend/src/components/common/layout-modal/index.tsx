"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import JBTabs from "../jb-tabs";
import JBModal from "../jb-modal";
import { LayoutType, useLayout } from "@/providers/layout-provider";

const LayoutTabs = () => {
	const { layoutType, setLayoutType } = useLayout();
	const [isOpen, setIsOpen] = useState(false);

	const tabs = [
		{
			name: "Layout",
			content: (
				<div className="flex flex-col items-center gap-4">
					<p className="text-center">
						Current Layout: <strong>{layoutType}</strong>
					</p>
					<div className="flex gap-4">
						<Button
							variant={
								layoutType === LayoutType.VERTICAL
									? "default"
									: "outline"
							}
							onClick={() => setLayoutType(LayoutType.VERTICAL)}
						>
							Apply Vertical Layout
						</Button>
						<Button
							variant={
								layoutType === LayoutType.HORIZONTAL
									? "default"
									: "outline"
							}
							onClick={() => setLayoutType(LayoutType.HORIZONTAL)}
						>
							Apply Horizontal Layout
						</Button>
					</div>
				</div>
			),
		},
	];

	return (
		<>
			<JBModal
				title="Switch Layout"
				description="Choose your preferred layout."
				trigger={
					<Button variant="outline" onClick={() => setIsOpen(true)}>
						Change Layout
					</Button>
				}
				content={<JBTabs tabs={tabs} />}
				open={isOpen}
				setOpen={setIsOpen}
				footer={
					<div className="flex justify-end gap-2">
						<Button
							variant="default"
							onClick={() => setIsOpen(false)}
						>
							Close
						</Button>
						<Button
							variant="default"
							onClick={() => setIsOpen(false)}
						>
							Apply
						</Button>
					</div>
				}
				width="max-w-md" // Adjust modal width
			/>
		</>
	);
};

export default LayoutTabs;
