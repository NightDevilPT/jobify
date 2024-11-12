import { createAction, props } from '@ngrx/store';
import { AppThemeEnum } from '../../../../interfaces/common.interface';

export const setTheme = createAction(
  '[Theme] Set Theme',
  props<{ themeType: AppThemeEnum }>()
);

export const toggleTheme = createAction('[Theme] Toggle Theme');
