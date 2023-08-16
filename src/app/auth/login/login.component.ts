import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginService } from 'src/app/services/login/login.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSubmitted: boolean = false;
  email: string = '';
  password: string = '';
  alertText: string = 'Hello';
  alertColor: string = 'text-rose-500';
  alertBorderColor: string = 'border-rose-500';
  alertBG: string = 'bg-rose-50'

  @ViewChild('txtpassword') txtpassword?: ElementRef;
  @ViewChild('txtemail') txtemail?: ElementRef;

  constructor(private service: LoginService, private authService: AuthService, private router: Router){};

  sendForm() {
    this.email = this.txtemail?.nativeElement.value;
    this.password = this.txtpassword?.nativeElement.value;

    // Not sending an empty form
    if(this.email == '' && this.password == '') {
      this.isSubmitted = true;
      this.alertText = "Email and password can not to be empty";
      setTimeout(() => {
        this.isSubmitted = false;
      }, 5000);
    }else if(this.email == environment.userName && this.password == environment.password) {//admin
      this.authService.login({name: 'admin', email: 'admin@admin.com'});
      this.router.navigate(['/admin']);
    }else { //sending users form
      this.service.sendLoginForm({
        email: this.email,
        password: this.password,
      }).subscribe((response: any) => {
        if(response.message != "valid") {
          this.isSubmitted = true;
          this.alertText = response.message;
          setTimeout(() => {
            this.isSubmitted = false;
          }, 5000)
        }else {
          this.authService.login(response.data);
          this.router.navigate(['/']);
        }
      });

    }

    
  }
}
