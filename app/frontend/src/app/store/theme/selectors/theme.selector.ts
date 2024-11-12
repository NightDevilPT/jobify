import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeState } from '../model/theme.model';

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectThemeType = createSelector(
  selectThemeState,
  (state: ThemeState) => state.themeType
);