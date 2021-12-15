import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  listPosts:Post[]=[]
  httpClient:HttpClient
  constructor(httpClient:HttpClient) { 
    this.httpClient=httpClient
  }

  async getAllChats(email:any,token:any,nickname:any){
    const response = await this.getAllPostsRequest(email,token,nickname);
    console.log(response)
    const publications = response.data.publications
    console.log("dATA:::",publications)
    this.listPosts=publications

  }

  async getAllPostsRequest(email:any,token:any,nickname:any){
    const data = await this.httpClient.get("http://localhost:4001/publication/all",
    {
      headers:{
        email,
        "access-token":token,
        nickname
      }
    }
    ).toPromise();
    const json = JSON.parse(JSON.stringify(data))
    console.log({status:json["status"],message:json["message"],data:json["data"]})
    return {status:json["status"],message:json["message"],data:json["data"]}
 
  }

  async createPost(email:any,token:any,nickname:any,title:string,creatorNickname:any,body:string,imageUrl:string){
    try{
      const post = await this.createPostRequest(email,token,nickname,title,creatorNickname,body,imageUrl)
      if(post.status==false){
        return false
      }
      this.listPosts=[]
      return true
      
    }catch(error){
      console.error(error);
      return false
      
    }
  }

  async createPostRequest(email:any,token:any,nickname:any,title:string,creatorNickname:any,body:string,imageUrl:string){
    const data = await this.httpClient.post("http://localhost:4001/publication/create",
    {
      title,
      creatorNickname,
      body,
      imageUrl
    },
    {
      headers:{
        email,
        "access-token":token,
        nickname
      }
    }
    ).toPromise();
    const json = JSON.parse(JSON.stringify(data))
    console.log({status:json["status"],message:json["message"],data:json["data"]})
    return {status:json["status"],message:json["message"],data:json["data"]}
    
  }

}
