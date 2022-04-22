import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../Services/post.service';
import { UserService } from '../../Services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cargar=0
  title=""
  imageUrl=""
  body=""
  fileName="Nombre del archivo"
  file:any  
  uploadUrl:any = "" 
  currentFile:any=""
  storage: AngularFireStorage
  nicknameicon:any=""
  postService:PostService
  userService:UserService
  router:Router
  constructor(private modalService: NgbModal,postService:PostService,userService:UserService,router:Router,storage: AngularFireStorage) {
    this.postService=postService
    this.userService=userService
    this.storage=storage
    this.router=router
  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
    });
  }

  ngOnInit(): void {
    console.log("CURRENT INICIO",this.currentFile)
    this.postService.getAllChats(localStorage.getItem("email"),localStorage.getItem("token"),localStorage.getItem("nickname"))
    this.userService.getInfoUser(localStorage.getItem("nickname"))
    this.nicknameicon=localStorage.getItem("nickname")
  }

  openModal(modal:any){
    this.modalService.open(modal);
  }

  closeModal(modal:any){
    this.modalService.dismissAll(modal)
    this.uploadUrl=""
    this.cargar=0
  }
  signOut():void{
    this.userService.signOut();
    this.router.navigateByUrl("/login")
  }

  async createPostDefinilly(){
    if(this.cargar==0){
      this.createPost()
    }else{
      this.uploadFileToFireBase()
      console.log(this.imageUrl)
      setTimeout(()=>{
        this.createPost()
        this.cargar==0
      }, 3000);
      

    }
  }
  async createPost(){
    if (this.title == "" || this.body =="") {
      alert("Ingrese todos los campos")
      return
    }
    if(this.imageUrl!=""){

    }
    const postValidation = await this.postService.createPost(localStorage.getItem("email"),localStorage.getItem("token"),localStorage.getItem("nickname"),this.title,localStorage.getItem("nickname"),this.body,this.imageUrl)
    console.log("post Validation return: "+postValidation)
    if(postValidation==true){
      alert("Post agregado")
      location.reload()
      this.imageUrl=""
      this.currentFile=""
      this.postService.getAllChats(localStorage.getItem("email"),localStorage.getItem("token"),localStorage.getItem("nickname"))
    }else{
      alert("Error al agregar post")
    }
    
  }
  convertToDate(date:any):string{
    let stringDate = ""
    const firstString = new Date((date-18000)*1000).toISOString().split("T")
    const secondString = firstString[1].split(":")
    stringDate = firstString[0] + " " + secondString[0] + ":" + secondString[1]
    return stringDate
  }
  //FILE
  readFile(fr:any){
    this.uploadUrl=fr.result
  }
  uploadFile(e:any){
    this.cargar=1
    var fr = new FileReader()
    const filelist = e.currentTarget.files
    console.log("CARGADO: ",filelist)
    if(filelist && filelist[0].type.includes("image")){
      this.fileName=filelist[0].name
      fr.onload=()=>this.readFile(fr)
      fr.readAsDataURL(e.currentTarget.files[0])
      this.currentFile=e.currentTarget.files[0]
      console.log("RESUTLADO",this.uploadUrl)

    }
    else{
      alert("Archivo no valido, solo imagenes")
      return 
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

  gotoUpdate(){
    this.router.navigateByUrl('/user/'+localStorage.getItem("nickname"));
  }
}
