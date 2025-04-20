import { RootState } from "@/store";

export const selectCount = (state: RootState) => state.counter.value;
export const selectIsLoading = (state: RootState) => state.counter.isLoading;
