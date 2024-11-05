import { createReducer, on } from '@ngrx/store';
import { AppLayoutEnum } from '../../../../interfaces/common.interface';
import { setLayout, toggleLayout } from '../actions/layout.action';
import { LayoutState } from '../model/layout.model';

export const initialLayoutState: LayoutState = {
  layoutType: AppLayoutEnum.HORIZONTAL, // Default layout
};

export const layoutReducer = createReducer(
  initialLayoutState,
  on(setLayout, (state, { layoutType }) => ({ ...state, layoutType })),
  on(toggleLayout, (state) => ({
    ...state,
    layoutType: state.layoutType === AppLayoutEnum.HORIZONTAL ? AppLayoutEnum.VERTICAL : AppLayoutEnum.HORIZONTAL
  }))
);
