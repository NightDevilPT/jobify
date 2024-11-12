import { LayoutState } from "./layout/model/layout.model";
import { ThemeState } from "./theme/model/theme.model";

export interface RootState {
  layout: LayoutState;
  theme:ThemeState
}
