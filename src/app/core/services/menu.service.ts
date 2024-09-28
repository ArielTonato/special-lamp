import { Injectable } from '@angular/core';

export interface IMenu {
  title: string;
  url: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private listMenu: IMenu[] = [
    { title: 'Agencias', url: '/agencies', icon: 'agency' },
    { title: 'Canales', url: '/channels', icon: 'channel' },
    { title: 'Clientes', url: '/clients', icon: 'client' },
    { title: 'Empleados', url: '/employees', icon: 'employee' },
    { title: 'Quejas/Reclamos', url: '/qr', icon: 'qr' },
    { title: 'Seguimiento', url: '/follow-up', icon: 'follow-up' },
  ];
  constructor() { }

  getMenu(): IMenu[] {
    return [...this.listMenu];
  }

  getMenuByUrl(url: string): IMenu {
    return this.listMenu.find(
      (menu) => menu.url.toLowerCase() === url.toLowerCase()
    ) as IMenu;
  }
}
