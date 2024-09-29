import { Component, inject, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ICliente {
  _id: number;
  cedula: string;
  name: string;
  lastName: string;
  description: string;
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
  data: ICliente[] = this.getDataFromLocalStorage();

  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "cedula", title: "CÉDULA" },
    { field: "name", title: "NOMBRE" },
    { field: "lastName", title: "APELLIDO" },
    { field: "description", title: "DESCRIPCIÓN" },
    { field: "address", title: "DIRECCIÓN" },
    { field: "email", title: "EMAIL" },
    { field: "phone", title: "TELÉFONO" }
  ];

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  records: ICliente[] = [];
  paginatedData: ICliente[] = []; // Nuevo arreglo para los datos paginados
  totalRecords = this.data.length;
  currentPage = 0;  // Página actual

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.saveToLocalStorage();
    this.loadClientes();
  }

  loadClientes() {
    this.records = this.data;
    this.changePage(this.currentPage);  // Mantener la página actual
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id);
    this.data.splice(position, 1);  // Eliminar el registro
    this.totalRecords = this.data.length;
    this.saveToLocalStorage();
    this.loadClientes();  // Mantener la página actual
    this.showMessage('Registro eliminado');
  }

  getDataFromLocalStorage() {
    const clientes = localStorage.getItem('clientes');
    return clientes ? JSON.parse(clientes) : [
      { _id: 1, cedula: '0102030405', name: 'Juan', lastName: 'Pérez', description: 'Cliente regular', address: 'Calle A', email: 'juan@ejemplo.com', phone: '0987654321' },
      { _id: 2, cedula: '0102030406', name: 'María', lastName: 'García', description: 'Cliente premium', address: 'Calle B', email: 'maria@ejemplo.com', phone: '0987654322' },
      { _id: 3, cedula: '0102030407', name: 'Carlos', lastName: 'Martínez', description: 'Cliente regular', address: 'Calle C', email: 'carlos@ejemplo.com', phone: '0987654323' },
      { _id: 4, cedula: '0102030408', name: 'Ana', lastName: 'López', description: 'Cliente nuevo', address: 'Calle D', email: 'ana@ejemplo.com', phone: '0987654324' },
      { _id: 5, cedula: '0102030409', name: 'Pedro', lastName: 'Sánchez', description: 'Cliente regular', address: 'Calle E', email: 'pedro@ejemplo.com', phone: '0987654325' },
      { _id: 6, cedula: '0102030410', name: 'Luisa', lastName: 'Rodríguez', description: 'Cliente premium', address: 'Calle F', email: 'luisa@ejemplo.com', phone: '0987654326' },
      { _id: 7, cedula: '0102030411', name: 'Miguel', lastName: 'Fernández', description: 'Cliente regular', address: 'Calle G', email: 'miguel@ejemplo.com', phone: '0987654327' },
      { _id: 8, cedula: '0102030412', name: 'Sofía', lastName: 'Gómez', description: 'Cliente nuevo', address: 'Calle H', email: 'sofia@ejemplo.com', phone: '0987654328' },
      { _id: 9, cedula: '0102030413', name: 'Javier', lastName: 'Ruiz', description: 'Cliente regular', address: 'Calle I', email: 'javier@ejemplo.com', phone: '0987654329' },
      { _id: 10, cedula: '0102030414', name: 'Patricia', lastName: 'Torres', description: 'Cliente premium', address: 'Calle J', email: 'patricia@ejemplo.com', phone: '0987654330' },
      { _id: 11, cedula: '0102030415', name: 'Andrés', lastName: 'Ramírez', description: 'Cliente regular', address: 'Calle K', email: 'andres@ejemplo.com', phone: '0987654331' },
      { _id: 12, cedula: '0102030416', name: 'Gabriela', lastName: 'Silva', description: 'Cliente nuevo', address: 'Calle L', email: 'gabriela@ejemplo.com', phone: '0987654332' },
      { _id: 13, cedula: '0102030417', name: 'Héctor', lastName: 'Molina', description: 'Cliente regular', address: 'Calle M', email: 'hector@ejemplo.com', phone: '0987654333' },
      { _id: 14, cedula: '0102030418', name: 'Elena', lastName: 'Ortiz', description: 'Cliente premium', address: 'Calle N', email: 'elena@ejemplo.com', phone: '0987654334' },
      { _id: 15, cedula: '0102030419', name: 'Ricardo', lastName: 'Cruz', description: 'Cliente regular', address: 'Calle O', email: 'ricardo@ejemplo.com', phone: '0987654335' },
      { _id: 16, cedula: '0102030420', name: 'Laura', lastName: 'Núñez', description: 'Cliente nuevo', address: 'Calle P', email: 'laura@ejemplo.com', phone: '0987654336' },
      { _id: 17, cedula: '0102030421', name: 'David', lastName: 'Vargas', description: 'Cliente regular', address: 'Calle Q', email: 'david@ejemplo.com', phone: '0987654337' },
      { _id: 18, cedula: '0102030422', name: 'Carmen', lastName: 'Peña', description: 'Cliente premium', address: 'Calle R', email: 'carmen@ejemplo.com', phone: '0987654338' }
    ];
  }

  saveToLocalStorage() {
    localStorage.setItem('clientes', JSON.stringify(this.data));
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
        const cliente = { ...response };
        this.data = this.data.map(ind => ind._id === cliente._id ? cliente : ind);
        this.saveToLocalStorage();
        this.loadClientes();  // Mantener la página actual
        this.showMessage('Registro actualizado');
      } else {
        const lastId = this.data[this.data.length - 1]._id;
        const cliente = { ...response, _id: lastId + 1 };
        this.data.push(cliente);
        this.totalRecords = this.data.length;
        this.saveToLocalStorage();
        this.loadClientes();  // Mantener la página actual
        this.showMessage('Registro exitoso');
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Clientes", "clientes", this.data);
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