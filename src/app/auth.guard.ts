import { Injectable, inject } from '@angular/core' 
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {
 constructor(private service: AuthService, private router: Router) {}
 canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  if(!this.service.isLoggedIn()) {
    this.router.navigate(['/login']);
    return false;
  }else {
    return true;
  }
 }
}
export const IsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean =>{
  return inject(AuthGuard).canActivate(route,state);
}
