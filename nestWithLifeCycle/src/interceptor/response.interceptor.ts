import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const response = http.getResponse();
    response.status(200);

    return next.handle().pipe(
      map((data) => ({
        from: process.env.PROJECT_CODE || '',
        error: 0,
        message: '',
        data: data || null,
        token: '',
      })),
    );
  }
}
