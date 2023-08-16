import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RegisterFeedbackInterface, RegisterInterface } from 'src/app/models/register-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
  api: string = 'https://minotes.ir/api.php?register';

  constructor(private http : HttpClient) { }

  sendRegisterForm(data: RegisterInterface) : Observable<RegisterFeedbackInterface> {
    return this.http.post(this.api, data) as Observable<RegisterFeedbackInterface>;
  }
}
