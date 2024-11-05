import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'jobify-vertical-layout',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './vertical-layout.component.html',
  styleUrl: './vertical-layout.component.scss'
})
export class VerticalLayoutComponent {

}
