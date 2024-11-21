import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jobify-menu-bar',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule,CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  @Input() menuItems: MenuItem[] = []; // Menu items passed from parent
  @Input() isPopup: boolean = true; // Determines if the menu is a popup or always visible

  // Capture parent templates
  @ContentChild('startTemplate', { read: TemplateRef }) startTemplate!: TemplateRef<any>;
  @ContentChild('subMenuTemplate', { read: TemplateRef }) subMenuTemplate!: TemplateRef<any>;
  @ContentChild('itemTemplate', { read: TemplateRef }) itemTemplate!: TemplateRef<any>;
  @ContentChild('endTemplate', { read: TemplateRef }) endTemplate!: TemplateRef<any>;

  @ViewChild('menu') menu!: Menu;

  public style:string = ""

  toggleMenu(event: Event): void {
    if (this.isPopup && this.menu) {
      this.menu.toggle(event);
    }
  }

  ngOnInit(): void {
    this.style = this.isPopup?"":""  // Add event listener to toggle menu on click
  }
}
