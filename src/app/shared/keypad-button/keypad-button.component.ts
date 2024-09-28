import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeypadButton } from '../interfaces/keypad.interface';

@Component({
  selector: 'qr-keypad-button',
  templateUrl: './keypad-button.component.html',
  styleUrls: ['./keypad-button.component.css']
})
export class KeypadButtonComponent {
  @Input() keypadButtons:KeypadButton[]=[]
  @Output() onClick:EventEmitter<string> = new EventEmitter<string>()

  doAction(action:string)
  {
    this.onClick.emit(action)
  }
}
