import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  @Input() title = ""
  isExpanded = false

  toggleDropdown(){
    this.isExpanded = !this.isExpanded;
  }
}
