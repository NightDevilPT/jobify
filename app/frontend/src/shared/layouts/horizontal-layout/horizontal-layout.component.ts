import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'jobify-horizontal-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  templateUrl: './horizontal-layout.component.html',
  styleUrl: './horizontal-layout.component.scss'
})
export class HorizontalLayoutComponent {
  
}
