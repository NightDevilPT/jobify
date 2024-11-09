import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from '../model/layout.model';

export const selectLayoutState = createFeatureSelector<LayoutState>('layout');

export const selectLayoutType = createSelector(
  selectLayoutState,
  (state: LayoutState) => state.layoutType
);
