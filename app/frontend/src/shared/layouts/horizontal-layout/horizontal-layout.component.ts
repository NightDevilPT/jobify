import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'jobify-horizontal-layout',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './horizontal-layout.component.html',
  styleUrl: './horizontal-layout.component.scss'
})
export class HorizontalLayoutComponent {

}
