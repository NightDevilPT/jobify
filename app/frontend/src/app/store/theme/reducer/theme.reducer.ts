import { createReducer, on } from '@ngrx/store';
import { setTheme, toggleTheme } from '../actions/theme.action';
import { ThemeState } from '../model/theme.model';
import { AppThemeEnum } from '../../../../interfaces/common.interface';

export const initialThemeState: ThemeState = {
  themeType: AppThemeEnum.LIGHT, // Default theme
};

export const themeReducer = createReducer(
  initialThemeState,
  on(setTheme, (state, { themeType }) => ({ ...state, themeType })),
  on(toggleTheme, (state) => ({
    ...state,
    themeType: state.themeType === AppThemeEnum.LIGHT ? AppThemeEnum.DARK : AppThemeEnum.LIGHT
  }))
);