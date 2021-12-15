import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  userService:UserService;
  router:Router
  userName = ""
  userPassword=""
  userEmail=""
  constructor(router:Router,userService:UserService) { 
    this.router=router
    this.userService=userService
  }
  ngOnInit(): void {
  }


  async onUserNameCreate(){
    if (this.userName == "" || this.userPassword=="" || this.userEmail=="") {
      alert("El nombre o password no deben estar vacíos.")
      return
    }
    const loginValidation = await this.userService.createUserName(this.userEmail,this.userName, this.userPassword)
    if(loginValidation==true){
      alert("Usuario creado con exito")
      this.router.navigateByUrl('/dashboard');
    }
    
  }
}
