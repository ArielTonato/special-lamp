import { Component } from '@angular/core';

@Component({
  selector: 'qr-root',
  templateUrl: './app.component.html',
  //template:'<p>Hola</p>',
  styleUrls: ['./app.component.css']
  //styles:['p {color: red;}']
})
export class AppComponent {
  title = 'appGQR';
  expanded=true

  toggleExpanded(expanded:boolean)
  {
    this.expanded = expanded
  }
}
