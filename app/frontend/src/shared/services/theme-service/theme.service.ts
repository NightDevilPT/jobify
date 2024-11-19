// theme.service.ts
import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ThemeState } from '../../../app/store/theme/model/theme.model';
import { selectThemeType } from '../../../app/store/theme/selectors/theme.selector';
import { setTheme, toggleTheme } from '../../../app/store/theme/actions/theme.action';
import { AppThemeEnum } from '../../../interfaces/common.interface';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  themeType$: Observable<AppThemeEnum>;
  private readonly THEME_STORAGE_KEY = 'app_theme';

  constructor(
    private store: Store<ThemeState>,
    private localStorageService: LocalStorageService, // Inject LocalStorageService
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.themeType$ = this.store.pipe(select(selectThemeType));

    // Initialize theme from local storage or set default
    this.initializeTheme();

    // Subscribe to theme changes and update the theme attribute
    this.themeType$.subscribe((theme) => {
      this.setThemeAttribute(theme);
      this.localStorageService.setItem(this.THEME_STORAGE_KEY, theme); // Update local storage when theme changes
    });
  }

  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = this.localStorageService.getItem<AppThemeEnum>(this.THEME_STORAGE_KEY);
      if (storedTheme) {
        this.setTheme(storedTheme); // Set theme from local storage
      } else {
        this.setTheme(AppThemeEnum.LIGHT); // Default theme if no local storage
      }
    } else {
      this.setTheme(AppThemeEnum.LIGHT); // Default theme for SSR
    }
  }

  toggleTheme(): void {
    this.store.dispatch(toggleTheme());
  }

  setTheme(theme: AppThemeEnum): void {
    this.store.dispatch(setTheme({ themeType: theme }));
  }

  private setThemeAttribute(theme: AppThemeEnum): void {
    if (isPlatformBrowser(this.platformId)) {
      const themeValue = theme === AppThemeEnum.LIGHT ? AppThemeEnum.DARK : AppThemeEnum.LIGHT;
      this.renderer.setAttribute(document.documentElement, 'data-theme', themeValue);
    }
  }
}
