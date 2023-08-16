import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login (user: any) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    if(localStorage.getItem('user') === null) {
      return false;
    }
    
    return true;
  }
}
