import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'jobify-horizontal-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './horizontal-layout.component.html',
  styleUrl: './horizontal-layout.component.scss'
})
export class HorizontalLayoutComponent {

}
