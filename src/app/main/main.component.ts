import { Component } from '@angular/core';
import { AdminService } from '../services/admin/admin.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  users = [{id: 1, name: 'test', email: '123', active: 1}];

  constructor(private service: AdminService) {
    this.service.sendAdmin().subscribe((response: any) => {
      this.users = response.data;
    })
  }

  //delete user
  deleteData(userId: any) { 
    this.service.deleteUser(userId).subscribe((response: any) => {
      this.users = response.data;
    })
  }

  //inactive user
  deactData(userId: any) { 
    this.service.deActiveUser(userId).subscribe((response: any) => {
      this.users = response.data;
      console.log(response);
    })
  }

  //active user
  actData(userId: any) { 
    this.service.activeUser(userId).subscribe((response: any) => {
      this.users = response.data;
      console.log(response);
    })
  }
}
