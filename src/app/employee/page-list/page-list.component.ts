import { Component, inject, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IEmpleado {
  _id: number;
  cedula: string;
  name: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
}


@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IEmpleado[] = this.getDataFromLocalStorage(); 

  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "cedula", title: "CÉDULA" },
    { field: "name", title: "NOMBRE" },
    { field: "lastName", title: "APELLIDO" },
    { field: "address", title: "DIRECCIÓN" },
    { field: "email", title: "EMAIL" },
    { field: "phone", title: "TELÉFONO" }
  ];

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  records: IEmpleado[] = [];
  paginatedData: IEmpleado[] = []; 
  totalRecords = this.data.length;
  currentPage = 0;  // Página actual

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.saveToLocalStorage();
    this.loadEmpleados();
  }

  loadEmpleados() {
    this.records = this.data;
    this.changePage(this.currentPage);  
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id);
    this.data.splice(position, 1); 
    this.totalRecords = this.data.length;
    this.saveToLocalStorage();
    this.loadEmpleados();  
    this.showMessage('Registro eliminado');
  }

  getDataFromLocalStorage() {
    const empleados = localStorage.getItem('empleados');
    return empleados ? JSON.parse(empleados) : [
      { _id: 1, cedula: '1234567890', name: 'Juan', lastName: 'Pérez', address: 'Calle Falsa 123', email: 'juan@example.com', phone: '0999999999' },
      { _id: 2, cedula: '0987654321', name: 'María', lastName: 'Gómez', address: 'Avenida Siempre Viva 456', email: 'maria@example.com', phone: '0888888888' }
    ];
  }

  saveToLocalStorage() {
    localStorage.setItem('empleados', JSON.stringify(this.data));
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
        const empleado = { ...response };
        console.log(empleado);
        this.data = this.data.map(ind => ind._id === empleado._id ? empleado : ind);
        this.saveToLocalStorage();
        this.loadEmpleados();  
        this.showMessage('Registro actualizado');
      } else {
        const lastId = this.data[this.data.length - 1]._id;
        const empleado = { ...response, _id: lastId + 1 };
        this.data.push(empleado);
        this.totalRecords = this.data.length;
        this.saveToLocalStorage();
        this.loadEmpleados();  
        this.showMessage('Registro exitoso');
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Empleados", "empleados", this.data);
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
    this.currentPage = page;  
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.paginatedData = this.records.slice(skip, skip + pageSize);
  }
}
