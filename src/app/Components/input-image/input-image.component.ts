import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})
export class InputImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(e:any){
    console.log()
  }
}
