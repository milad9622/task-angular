import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  api: string = 'https://minotes.ir/api.php?verify=';

  constructor(private http : HttpClient) { }

  

  sendVerify(code: string) : Observable<{}> {
    return this.http.get(this.api + code) as Observable<{}>;
  }
}
