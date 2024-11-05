import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RootLayoutComponent } from "../shared/layouts/root-layout/root-layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RootLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
