import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { IsAuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsAuthGuard]},
  { path: 'admin', component: MainComponent, canActivate: [IsAuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'verify', component: VerifyComponent},
  { path: '404' , component: NotfoundComponent},
  { path: '**' , redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
