import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VerifyService } from 'src/app/services/verify/verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: VerifyService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    //get verify code and login user
    this.route.queryParams.subscribe((param) => {
      if(param['code']) { //if link is true
        this.service.sendVerify(param['code']).subscribe((response: any) => {
          console.log(response);
          if(response.message == 'valid') {
            this.authService.login(response.data);
            this.router.navigate(['/']);
          }else {
            alert ("you need to log in");
            this.router.navigate(['login']);
          }
        })
      } else { //if link is wrong
        this.router.navigate(['login']);
      }
    })
  }
}
