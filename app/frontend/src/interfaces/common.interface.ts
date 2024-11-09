import { SafeHtml } from '@angular/platform-browser';

export enum AppLayoutEnum{
	HORIZONTAL='HORIZONTAL',
	VERTICAL='VERTICAL'
}

export enum IconTypeEnum {
    TRAVEL_EXPLORE = 'travel_explore',
    HOME = 'home',
    FAVORITE = 'favorite',
    // Add more icons as needed
}

// A generic type where keys are strings and values are SafeHtml
export type IconMap = { [key: string]: SafeHtml };
