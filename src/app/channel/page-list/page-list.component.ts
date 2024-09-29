import { Component, inject, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ICanal {
  _id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: ICanal[] = this.getDataFromLocalStorage();

  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "name", title: "CANAL" },
    { field: "description", title: "DESCRIPCIÓN" }
  ];

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  records: ICanal[] = [];
  paginatedData: ICanal[] = []; // Nuevo arreglo para los datos paginados
  totalRecords = this.data.length;
  currentPage = 0;  // Página actual

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.saveToLocalStorage();
    this.loadCanales();
  }

  loadCanales() {
    this.records = this.data;
    this.changePage(this.currentPage);  // Mantener la página actual
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id);
    this.data.splice(position, 1);  // Eliminar el registro
    this.totalRecords = this.data.length;
    this.saveToLocalStorage();
    this.loadCanales();  // Mantener la página actual
    this.showMessage('Registro eliminado');
  }

  getDataFromLocalStorage() {
    const canales = localStorage.getItem('canales');
    return canales ? JSON.parse(canales) : [
      { _id: 1, name: 'Teléfono', description: 'Atención telefónica' },
      { _id: 2, name: 'Correo Electrónico', description: 'Atención por email' },
      { _id: 3, name: 'Formulario Web', description: 'Formulario en el sitio web' },
      { _id: 4, name: 'Chat en línea', description: 'Atención mediante chat' },
      { _id: 5, name: 'Redes Sociales', description: 'Atención por redes sociales' },
    ];
  }

  saveToLocalStorage() {
    localStorage.setItem('canales', JSON.stringify(this.data));
  }

  openForm(row: any | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    };
    const reference: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, options);

    reference.afterClosed().subscribe((response) => {
      if (!response) { return; }
      if (response._id) {
        const canal = { ...response };
        this.data = this.data.map(ind => ind._id === canal._id ? canal : ind);
        this.saveToLocalStorage();
        this.loadCanales();  // Mantener la página actual
        this.showMessage('Registro actualizado');
      } else {
        const lastId = this.data[this.data.length - 1]._id;
        const canal = { ...response, _id: lastId + 1 };
        this.data.push(canal);
        this.totalRecords = this.data.length;
        this.saveToLocalStorage();
        this.loadCanales();  // Mantener la página actual
        this.showMessage('Registro exitoso');
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Canales", "canales", this.data);
        break;
      case 'NEW':
        this.openForm();
        break;
    }
  }

  showBottomSheet(title: string, fileName: string, data: any) {
    this.bottomSheet.open(DownloadComponent);
  }

  showMessage(message: string, duration: number = 3000) {
    this.snackBar.open(message, '', { duration });
  }

  changePage(page: number) {
    this.currentPage = page;  // Actualizar la página actual
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.paginatedData = this.records.slice(skip, skip + pageSize); // Actualiza solo los datos paginados
  }
}
