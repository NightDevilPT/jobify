import { ActionReducerMap } from '@ngrx/store';
import { layoutReducer } from './layout/reducer/layout.reducer';
import { RootState } from './store.state';
import { themeReducer } from './theme/reducer/theme.reducer';

export const rootReducer: ActionReducerMap<RootState> = {
  layout: layoutReducer,
  theme:themeReducer
};
