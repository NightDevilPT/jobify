import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppThemeEnum } from '../../../interfaces/common.interface';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme-service/theme.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { MenuBarComponent } from "../menu-bar/menu-bar.component";

@Component({
  selector: 'jobify-header',
  standalone: true,
  imports: [CommonModule, MenuModule, BadgeModule, RippleModule, AvatarModule, MenuBarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  themeType$: Observable<AppThemeEnum> = of(AppThemeEnum.LIGHT);
  AppThemeEnum = AppThemeEnum;
  menuItems: MenuItem[] = [

        {
          label: 'Settings',
          icon: 'pi pi-cog',
          shortcut: '⌘+O'
        },
        {
          label: 'Messages',
          icon: 'pi pi-inbox',
          badge: '2'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          shortcut: '⌘+Q'
        }
  ];

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
