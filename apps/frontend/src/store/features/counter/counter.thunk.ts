import { AppDispatch } from "@/store";
import { incrementByAmount, setLoading } from "./counter.slice";

// Async thunk to increment after a delay
export const incrementAsync = (amount: number) => 
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch(incrementByAmount(amount));
    dispatch(setLoading(false));
  };