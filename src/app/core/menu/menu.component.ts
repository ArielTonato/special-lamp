import { Component, EventEmitter, inject, Output } from '@angular/core';
import { IMenu, MenuService } from '../services/menu.service';

@Component({
  selector: 'qr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() onToggleExpanded = new EventEmitter<boolean>();
  listMenu: IMenu[] = [];
  expanded: boolean = true;

  menuSrv = inject(MenuService);
  
  constructor() {
    this.listMenu = this.menuSrv.getMenu();
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.onToggleExpanded.emit(this.expanded);
  }
}
