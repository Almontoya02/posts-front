import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @Input() onerrorinfo:string | undefined
  @Input() nickname:string | undefined
  @Input() imgUrl:any | undefined
  @Output() buttonSelected: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }


  onSelectBtn(){
    this.buttonSelected?.emit()
  }
}
