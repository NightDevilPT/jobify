import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterState } from "./counter.interface";

const initialState: CounterState = {
	value: 0,
	isLoading: false,
};

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const { increment, decrement, incrementByAmount, setLoading } =
	counterSlice.actions;
export default counterSlice.reducer;
