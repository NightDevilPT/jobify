import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppThemeEnum } from '../../../interfaces/common.interface';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme-service/theme.service';

@Component({
  selector: 'jobify-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  themeType$: Observable<AppThemeEnum> = of(AppThemeEnum.LIGHT);
  AppThemeEnum = AppThemeEnum;

  constructor(private themeService: ThemeService) {
    this.themeType$ = this.themeService.themeType$;
  }

  ngOnInit(): void {
    // No need for additional subscriptions here as ThemeService handles them
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onSetTheme(theme: AppThemeEnum): void {
    this.themeService.setTheme(theme);
  }
}