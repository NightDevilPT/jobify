import { ActionReducerMap } from '@ngrx/store';
import { layoutReducer } from './layout/reducer/layout.reducer';
import { RootState } from './store.state';

export const rootReducer: ActionReducerMap<RootState> = {
  layout: layoutReducer,
};
