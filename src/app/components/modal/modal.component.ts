import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() isOpened = false;
  @Input() text = ""
  @Input() modalTitle = ""
  @Output() onCancel = new EventEmitter()
  @Output() onConfirm = new EventEmitter()

  onModalCancel(){
    this.onCancel.emit()
  }

  onModalConfirm(){
    this.onConfirm.emit()
  }




}
