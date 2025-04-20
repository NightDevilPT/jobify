"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
	selectCount,
	selectIsLoading,
} from "@/store/features/counter/counter.selector";
import { decrement, increment } from "@/store/features/counter/counter.slice";
import { incrementAsync } from "@/store/features/counter/counter.thunk";

export default function Home() {
	const count = useAppSelector(selectCount);
	const isLoading = useAppSelector(selectIsLoading);
	const dispatch = useAppDispatch();

	return (
		<div>
			<h1>Counter: {count}</h1>
			<div className="grid grid-cols-3 gap-2">
				<Button onClick={() => dispatch(increment())}>Increment</Button>
				<Button onClick={() => dispatch(decrement())}>Decrement</Button>
				<Button
					onClick={() => dispatch(incrementAsync(5))}
					disabled={isLoading}
				>
					{isLoading ? "Loading..." : "Increment Async (+5)"}
				</Button>
			</div>
		</div>
	);
}
