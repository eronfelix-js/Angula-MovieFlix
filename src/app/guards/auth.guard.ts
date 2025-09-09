import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica se tem token no localStorage diretamente
  const token = authService.getToken();
  const user = authService.getCurrentUser();
  
  if (token && user) {
    return true;
  }
  
  return router.createUrlTree(['/login']);
};
