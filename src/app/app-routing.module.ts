import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { RegisterPageComponent } from './Components/register-page/register-page.component';
import { UpdateUserComponent } from './Components/update-user/update-user.component';

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
  {
    path:"user/:user",
    component: UpdateUserComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
