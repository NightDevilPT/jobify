import { createAction, props } from '@ngrx/store';
import { AppLayoutEnum } from '../../../../interfaces/common.interface';

export const setLayout = createAction(
  '[Layout] Set Layout',
  props<{ layoutType: AppLayoutEnum }>()
);

export const toggleLayout = createAction('[Layout] Toggle Layout');
