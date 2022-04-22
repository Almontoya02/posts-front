import { Component,EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-principal',
  templateUrl: './btn-principal.component.html',
  styleUrls: ['./btn-principal.component.css']
})
export class BtnPrincipalComponent implements OnInit {

  @Input() name: string | undefined
  @Output() buttonSelected: EventEmitter<any> = new EventEmitter()
  ngOnInit(): void {
  }

  onSelectBtn(){
    this.buttonSelected?.emit()
  }

}
