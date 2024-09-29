import { Component, inject, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IQueja {
  _id: number;
  name: string;        // Nombre del usuario que hace la queja
  email: string;       // Email de contacto
  phone: string;       // Teléfono de contacto
  complaintType: string;  // Tipo de queja (por ejemplo, mal servicio, error de facturación, etc.)
  description: string;  // Descripción de la queja
  date: string;        // Fecha de la queja
  channel: string;     // Canal por el cual se presentó la queja
}


@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IQueja[] = this.getDataFromLocalStorage();

  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "name", title: "NOMBRE" },
    { field: "email", title: "EMAIL" },
    { field: "phone", title: "TELÉFONO" },
    { field: "complaintType", title: "TIPO DE QUEJA" },
    { field: "description", title: "DESCRIPCIÓN" },
    { field: "date", title: "FECHA" },
    { field: "channel", title: "CANAL" }
  ];

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  records: IQueja[] = [];
  paginatedData: IQueja[] = []; // Nuevo arreglo para los datos paginados
  totalRecords = this.data.length;
  currentPage = 0;  // Página actual

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.saveToLocalStorage();
    this.loadQuejas();
  }

  loadQuejas() {
    this.records = this.data;
    this.changePage(this.currentPage);  // Mantener la página actual
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id);
    this.data.splice(position, 1);  // Eliminar el registro
    this.totalRecords = this.data.length;
    this.saveToLocalStorage();
    this.loadQuejas();  // Mantener la página actual
    this.showMessage('Registro eliminado');
  }

  getDataFromLocalStorage() {
    const quejas = localStorage.getItem('quejas');
    return quejas ? JSON.parse(quejas) : [
      { _id: 1, name: 'Juan Pérez', email: 'juan@example.com', phone: '0999999999', complaintType: 'Mal Servicio', description: 'El servicio fue deficiente.', date: '2023-09-28', channel: 'Teléfono' },
      { _id: 2, name: 'María Gómez', email: 'maria@example.com', phone: '0888888888', complaintType: 'Error de Facturación', description: 'Hubo un error en la factura.', date: '2023-09-29', channel: 'Correo Electrónico' }
    ];
  }

  saveToLocalStorage() {
    localStorage.setItem('quejas', JSON.stringify(this.data));
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
        const queja = { ...response };
        this.data = this.data.map(ind => ind._id === queja._id ? queja : ind);
        this.saveToLocalStorage();
        this.loadQuejas();  // Mantener la página actual
        this.showMessage('Registro actualizado');
      } else {
        const lastId = this.data[this.data.length - 1]._id;
        const queja = { ...response, _id: lastId + 1 };
        this.data.push(queja);
        this.totalRecords = this.data.length;
        this.saveToLocalStorage();
        this.loadQuejas();  // Mantener la página actual
        this.showMessage('Registro exitoso');
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Quejas y Reclamos", "quejas", this.data);
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
