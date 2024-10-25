export interface BaseResponse<T = any> {
	message: string;
	data?: T;
	meta?: Meta;
  }
  
  export interface Meta {
	totalPages: number;
	currentPage: number;
	nextPage: number | null;
	previousPage: number | null;
	totalCount: number;
  }
  