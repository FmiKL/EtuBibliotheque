import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../service/user.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const userService = inject(UserService);
  const token = userService.getToken();

  const publicUrls = [
    '/api/login',
    '/api/register'
  ];

  const isPublicUrl = publicUrls.some(url => request.url.includes(url));

  if (token && !isPublicUrl) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};
