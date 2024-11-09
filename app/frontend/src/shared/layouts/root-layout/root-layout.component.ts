import { Component } from '@angular/core';
import { VerticalLayoutComponent } from "../vertical-layout/vertical-layout.component";
import { HorizontalLayoutComponent } from "../horizontal-layout/horizontal-layout.component";

@Component({
  selector: 'jobify-root-layout',
  standalone: true,
  imports: [VerticalLayoutComponent, HorizontalLayoutComponent],
  templateUrl: './root-layout.component.html',
  styleUrl: './root-layout.component.scss'
})
export class RootLayoutComponent {

}
