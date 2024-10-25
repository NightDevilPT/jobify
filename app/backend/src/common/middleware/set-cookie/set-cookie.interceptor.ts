import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Response } from 'express';
  
  @Injectable()
  export class SetCookieInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
	  const ctx = context.switchToHttp();
	  const response = ctx.getResponse<Response>();
	  
	  return next.handle().pipe(
		map((data) => {
		  // Assuming the JWT token is in the `data` object as `token`
		  const { token, ...rest } = data;
  
		  // Set the JWT token as a cookie in the response
		  if (token) {
			response.cookie('jwt', token, {
			  httpOnly: true, // Cookie cannot be accessed via client-side JavaScript
			  secure: true,   // Ensure this is true for HTTPS environments
			  sameSite: 'strict',
			});
		  }
  
		  // Return the remaining response data
		  return rest;
		})
	  );
	}
  }
  