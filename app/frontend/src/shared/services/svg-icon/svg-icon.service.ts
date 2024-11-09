// icons.service.ts
import { Injectable } from '@angular/core';
import { IconTypeEnum } from '../../../interfaces/common.interface';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  private iconMap: { [key in IconTypeEnum]: string } = {
    [IconTypeEnum.TRAVEL_EXPLORE]: 'travel_explore',
    [IconTypeEnum.HOME]: 'home',
    [IconTypeEnum.FAVORITE]: 'favorite',
    // Map more icons as needed
  };

  getIcon(iconType: IconTypeEnum, size: string = 'text-base', color: string = 'text-black'): string {
    const iconName = this.iconMap[iconType];
    return `<span class="material-symbols-outlined ${size} ${color}">${iconName}</span>`;
  }
}
