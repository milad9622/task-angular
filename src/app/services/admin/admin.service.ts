import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  api: string = 'https://minotes.ir/api.php';

  constructor(private http: HttpClient) { }

  //login admin
  sendAdmin() : Observable<any> {
    return this.http.get(this.api + `?users`) as Observable<any>;
  }

  //delete user
  deleteUser(userId: any) : Observable<any> {
    return this.http.get(this.api + `?delete=${userId}`) as Observable<any>;
  }

  //active user
  activeUser(userId: any) : Observable<any> {
    return this.http.get(this.api + `?act=${userId}`) as Observable<any>;
  }

  //inactive user
  deActiveUser(userId: any) : Observable<any> {
    return this.http.get(this.api + `?deact=${userId}`) as Observable<any>;
  }
}
