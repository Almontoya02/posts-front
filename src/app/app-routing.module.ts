import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:'full',
    redirectTo:"login"
  },
  {
    path:"login",
    component: LoginPageComponent,
  },
  {
    path:"register",
    component: RegisterPageComponent,
  },
  {
    path:"dashboard",
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
