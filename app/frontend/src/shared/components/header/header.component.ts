import { Component, OnInit } from '@angular/core';
import { IconsService } from '../../services/svg-icon/svg-icon.service';
import { IconMap, IconTypeEnum } from '../../../interfaces/common.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'jobify-header',
  standalone: true,
  imports: [],
  providers: [IconsService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public icons: IconMap = {}; // Using the generic type

  constructor(
    private readonly iconService: IconsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Populate icons dynamically, each icon sanitized
    this.icons = {
      logo: this.sanitizer.bypassSecurityTrustHtml(
        this.iconService.getIcon(IconTypeEnum.TRAVEL_EXPLORE,'text-4xl','text-primary-500')
      ),
    };
  }
}
