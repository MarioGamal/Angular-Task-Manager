import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token){
    const clonedReq = req.clone({
      setHeaders :{
        'x-auth-token': token,
        'Authorization': `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }else{
    return next(req);
  }
  
};
