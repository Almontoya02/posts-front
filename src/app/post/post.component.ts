import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() title:string | undefined
  @Input() body:string | undefined
  @Input() img:string | undefined
  @Input() autor:string | undefined
  @Input() date:string | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
