import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  cargar=0
  nickname=""
  email=""
  imageUrl=""
  fileName="Nombre del archivo"
  file:any  
  uploadUrl:any = "" 
  currentFile:any=""
  storage: AngularFireStorage


  userService:UserService
  router:Router
  constructor(userService:UserService,router:Router,storage: AngularFireStorage) {
    this.userService=userService
    this.router=router
    this.storage=storage
  }

  ngOnInit(): void {
    this.userService.getInfoUser(localStorage.getItem("nickname"))
    setTimeout(()=>{
      this.email=this.userService.email
      this.imageUrl=this.userService.imageUrl
      this.nickname=this.userService.nickName
    }, 1000);
  }

  gotoMain(){
    this.router.navigateByUrl("/dashboard")
  }

  signOut():void{
    this.userService.signOut();
    this.router.navigateByUrl("/login")
  }
  readFile(fr:any){
    this.uploadUrl=fr.result
    this.userService.imageUrl=this.uploadUrl
    console.log("IAMGEN1:",this.uploadUrl)
    console.log("IMAGEN2: ",this.userService.imageUrl)
  }
  uploadFile(e:any){
    this.cargar=1
    var fr = new FileReader()
    const filelist = e.currentTarget.files

    if(filelist && filelist[0].type.includes("image")){
      this.fileName=filelist[0].name
      fr.onload=()=>this.readFile(fr)
      fr.readAsDataURL(e.currentTarget.files[0])
      this.currentFile=e.currentTarget.files[0]


      console.log("IMAGEN;",this.uploadUrl)

    }
    else{
      alert("Archivo no valido, solo imagenes")
      return 
    }
  }
  async updateDefinilly(){
    if(this.cargar==0){
      
    }else{
      this.uploadFileToFireBase()
      console.log("IMAGEN QUE SE SUBE: ",this.imageUrl)
      setTimeout( async()=>{
        const result= await this.userService.updateImg(localStorage.getItem("nickname"),this.imageUrl)
        if(result){
          alert("Imagen actualizada con exito")
          this.cargar==0
          location.reload()
        }else{
          this.cargar==0
          alert("Error al cargar")
        }


      }, 3000);
      

    }
  }
  uploadFileToFireBase() {
    const file = this.currentFile
    const filePath = this.currentFile.name;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).then(() => {
        const download = fileRef.getDownloadURL();
        console.log(download)
        download.subscribe((url: string) => {

            this.imageUrl = url
            console.log("URL FIREBASE: ",this.imageUrl)

        })
    })
  }


}
