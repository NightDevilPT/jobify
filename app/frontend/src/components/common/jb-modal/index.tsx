import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VariantProps =
	| "outline"
	| "link"
	| "default"
	| "destructive"
	| "secondary"
	| "ghost";

interface JBModalProps {
	title: string;
	description?: string;
	variant?: VariantProps;
	trigger?: React.ReactNode; // Custom trigger element
	content: React.ReactNode;
	footer?: React.ReactNode | null; // Custom footer, null to hide
	open?: boolean;
	setOpen?: (value: boolean) => void;
	primaryButtonText?: string;
	secondaryButtonText?: string;
	primaryButtonAction?: () => void;
	secondaryButtonAction?: () => void;
	className?: string;
	width?: string;
}

const JBModal: React.FC<JBModalProps> = ({
	title,
	description,
	variant = "outline",
	trigger,
	content,
	footer,
	open,
	setOpen,
	primaryButtonText = "Confirm",
	secondaryButtonText = "Cancel",
	primaryButtonAction,
	secondaryButtonAction,
	className = "",
	width = "max-w-lg",
}) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* Trigger Element */}
			{setOpen && trigger ? (
				<DialogTrigger asChild>{trigger}</DialogTrigger>
			) : (
				setOpen && (
					<DialogTrigger asChild>
						<Button variant={variant}>Open Modal</Button>
					</DialogTrigger>
				)
			)}

			{/* Modal Header */}
			<DialogContent className={cn("w-auto", width, className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && (
						<DialogDescription>{description}</DialogDescription>
					)}
				</DialogHeader>

				{/* Modal Body */}
				<div className="py-4">{content}</div>

				{/* Footer (Custom or Default Buttons) */}
				{footer ?? (
					<DialogFooter className="flex justify-end gap-2">
						{secondaryButtonAction && (
							<Button
								variant="secondary"
								onClick={secondaryButtonAction}
							>
								{secondaryButtonText}
							</Button>
						)}
						{primaryButtonAction && (
							<Button
								variant="default"
								onClick={primaryButtonAction}
							>
								{primaryButtonText}
							</Button>
						)}
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default JBModal;
