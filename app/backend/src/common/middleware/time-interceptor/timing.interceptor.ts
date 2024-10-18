import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap, map } from 'rxjs/operators';
  
  @Injectable()
  export class TimingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
	  // Capture the time the request was received
	  const startTime = Date.now();
  
	  // Add startTime to the request object (optional)
	  const request = context.switchToHttp().getRequest();
	  request.startTime = startTime;
  
	  return next.handle().pipe(
		map((responseBody) => {
		  const endTime = Date.now();
		  const timeTaken = endTime - startTime;
  
		  return {
			...responseBody,
			timeTaken: `${timeTaken}ms`,
			start:new Date(request.startTime).toLocaleString(),
			end:new Date(endTime).toLocaleString()
		  };
		}),
		tap(() => {
		  const endTime = Date.now();
		  const timeTaken = endTime - startTime;
  
		  const response = context.switchToHttp().getResponse();
		  response.set('X-Time-Taken-ms', timeTaken.toString());
		}),
	  );
	}
  }
  