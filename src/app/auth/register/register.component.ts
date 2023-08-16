import { Component, ElementRef, ViewChild } from '@angular/core';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isSubmitted: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  alertText: string = 'Hello';
  alertColor: string = 'text-rose-500';
  alertBorderColor: string = 'border-rose-500';
  alertBG: string = 'bg-rose-50'

  @ViewChild('txtname') txtname?: ElementRef;
  @ViewChild('txtpassword') txtpassword?: ElementRef;
  @ViewChild('txtemail') txtemail?: ElementRef;

  constructor(private service: RegisterService){};

  sendForm() {
    this.name = this.txtname?.nativeElement.value;
    this.email = this.txtemail?.nativeElement.value;
    this.password = this.txtpassword?.nativeElement.value;

    //register
    if(this.name && this.email && this.password) {
      this.service.sendRegisterForm({
        name: this.name,
        email: this.email,
        password: this.password,
      }).subscribe((response: any) => {
        // if this email registered already
        if(!response.status) {
          this.isSubmitted = true;
          this.alertText = 'This email is not available';
          this.alertColor = 'text-rose-500';
          this.alertBorderColor = 'border-rose-500';
          this.alertBG = 'bg-rose-50';
        }else { //register completed
          this.isSubmitted = true;
          this.alertText = 'Success! ckeck your email to verify your email';
          this.alertBG = 'bg-emerald-50';
          this.alertBorderColor = 'border-emerald-500';
          this.alertColor = 'text-emerald-500';
        }
        
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000)
      });
      
    }
  }
}
