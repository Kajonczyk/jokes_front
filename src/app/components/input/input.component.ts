import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
interface ChangeEvent {
  target: { value: string };
}
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Output() handleChange: EventEmitter<any> = new EventEmitter<any>()
  @Input() labelText = ""
  @Input() type = "text"
  value: string = "";
  onChange: any = () => {};
  onTouched: any = () => {};


  // onChange(event: Event){
  //   console.log("dupa")
  //   this.handleChange.emit((event.target as HTMLInputElement).value)
  // }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onInputChange(event: Event) {
    const targetValue = (event.target as HTMLInputElement).value;
    this.value = targetValue;
    this.onChange(targetValue);
    this.onTouched();
  }

}
