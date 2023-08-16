import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api: string = 'https://minotes.ir/api.php?login';

  constructor(private http : HttpClient) { }

  sendLoginForm(data: any) : Observable<any> {
    console.log(data);
    return this.http.post(this.api, data) as Observable<any>;
  }
}
