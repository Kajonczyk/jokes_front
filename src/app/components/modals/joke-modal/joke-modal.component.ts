import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-joke-modal',
  templateUrl: './joke-modal.component.html',
  styleUrls: ['./joke-modal.component.scss']
})
export class JokeModalComponent {

  joke = ""
  @Output() onJokeToldModalCancelled = new EventEmitter()
  @Output() onJokeToldModalConfirmed = new EventEmitter()

  handleModalClose(){
    this.onJokeToldModalCancelled.emit()
  }

  handleModalConfirm(){
    console.log("TEST", this.joke)
    this.onJokeToldModalConfirmed.emit(this.joke)
  }

  onChange(event: any){
    this.joke = event.target.value
  }

}
