import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../Models/api-response.model';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  nickName: string = "";
  email: string="";
  token: string = "";
  userPassword: string = ""
  imageUrl=""
  postService:PostService
  httpClient:HttpClient
  constructor(httpClient:HttpClient,postService:PostService) { 
    this.httpClient=httpClient
    this.postService=postService
  }

  async createUserName(email:string,name:string,password:string):Promise<boolean>{
    try{
      const registerResponse:ApiResponse = await this.createRegisterRequest(email,name,password)
      if(registerResponse.status==false){
        alert("Fallo al registrarse o usuario existente: " + registerResponse.message.toString())
        return false;
      }
      localStorage.setItem("nickname",registerResponse.data.nickname)
      localStorage.setItem("email",email)
      localStorage.setItem("token",registerResponse.data.token)
      this.email=email
      this.token=registerResponse.data.token
      return true;
    }catch(error){
      return false
    }
  }

  async loginUserName(email:string,password:string):Promise<boolean>{
    try{
      const loginResponse:ApiResponse = await this.loginRegisterRequest(email,password)
      if(loginResponse.status==false){
        return false;
      }
      localStorage.setItem("nickname",loginResponse.data.nickname)
      localStorage.setItem("email",email)
      localStorage.setItem("token",loginResponse.data.token)
      this.nickName=loginResponse.data.nickname
      alert("hola:" +loginResponse.data.nickname)
      this.email=email
      this.token=loginResponse.data.token
      return true;
    }catch(error){
      return false
    }
  }

  async createRegisterRequest(email:string,nickname: string,password:string):Promise<ApiResponse>{
    const data = await this.httpClient.post("http://localhost:4001/user/register",{email,nickname,password}).toPromise();
    const json = JSON.parse(JSON.stringify(data))
    console.log({status:json["status"],message:json["message"],data:json["data"]})
    return {status:json["status"],message:json["message"],data:json["data"]}
    
  } 

  async loginRegisterRequest(email: string,password:string):Promise<ApiResponse>{
    const data = await this.httpClient.post("http://localhost:4001/user/login",{email,password}).toPromise();
    console.log(data)
    const json = JSON.parse(JSON.stringify(data))
    return {status:json["status"],message:json["message"],data:json["data"]}
  }
  signOut(){
    localStorage.removeItem("nickname")
    localStorage.removeItem("email")
    localStorage.removeItem("token")
    this.email=""
    this.nickName=""
    this.token=""
    this.postService.listPosts=[]
    this.imageUrl=""
  }

  async getInfoUserRequest(nickname: string){
    const data = await this.httpClient.get("http://localhost:4001/user/"+nickname).toPromise();
    console.log(data)
    const json = JSON.parse(JSON.stringify(data))
    return {status:json["status"],message:json["message"],data:json["data"]}
  }

  async getInfoUser(nickname: any){
    const user = await this.getInfoUserRequest(nickname)
    this.imageUrl=user.data.user.imageUrl
    this.nickName=user.data.user.nickname
    this.email=user.data.user.email
    console.log("IMAGEN USER: ",this.imageUrl)
  }

  async updateImgRequest(nickname: string,imageUrl:string){
    const data = await this.httpClient.patch("http://localhost:4001/user/update",{
      nickname,
      imageUrl
    }).toPromise();
    console.log(data)
    const json = JSON.parse(JSON.stringify(data))
    return {status:json["status"],message:json["message"],data:json["data"]}
  }

  async updateImg(nickname: any,imageUrl:string){
    const user = await this.updateImgRequest(nickname,imageUrl)
    this.imageUrl=user.data.user.imageUrl

    if(user.status==true){
      return true
    }
    return false
  }



}
