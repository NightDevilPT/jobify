import { Component, Input } from '@angular/core';
import { SvgIconService } from '../../services/svg-icon/svg-icon.service';
import { SvgIconEnum } from '../../../interfaces/common.interface';

@Component({
  selector: 'jobify-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent {
  @Input() iconName: SvgIconEnum = SvgIconEnum.LOGO;
  @Input() color: string = 'currentColor';
  svgContent: string = '';

  constructor(private svgIconService: SvgIconService) {}

  ngOnInit(): void {
    this.loadIcon();
  }

  loadIcon(): void {
    if (this.iconName) {
      this.svgIconService.getIcon(this.iconName).subscribe((content) => {
        this.svgContent = content;
      });
    }
  }
}
