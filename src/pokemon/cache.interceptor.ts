import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache: Map<string, string> = new Map();
  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    const { slug } = context.switchToHttp().getRequest<Request>();
    if (this.cache.has(slug)) {
      return of(this.cache.get(slug));
    }
    return next.handle().pipe(
      map((value) => {
        this.cache.set(slug, value);
        return value;
      }),
    );
  }
}
