import { Component, inject, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IAgency {
  _id: number;
  name: string;
  address: string;
}

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IAgency[] = this.getDataFromLocalStorage();

  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "name", title: "AGENCIA" },
    { field: "address", title: "DIRECCIÓN" }
  ];

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  records: IAgency[] = [];
  paginatedData: IAgency[] = []; // Nuevo arreglo para los datos paginados
  totalRecords = this.data.length;
  currentPage = 0;  // Página actual

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.saveToLocalStorage();
    this.loadAgencies();
  }

  loadAgencies() {
    this.records = this.data;
    this.changePage(this.currentPage);  // Mantener la página actual
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id);
    this.data.splice(position, 1);  // Eliminar el registro
    this.totalRecords = this.data.length;
    this.saveToLocalStorage();
    this.loadAgencies();  // Mantener la página actual
    this.showMessage('Registro eliminado');
  }

  getDataFromLocalStorage() {
    const agencies = localStorage.getItem('agencies');
    return agencies ? JSON.parse(agencies) : [
      { _id: 1, name: 'Ambato', address: 'Calle A' },
      { _id: 2, name: 'Riobamba', address: 'Calle B' },
      { _id: 3, name: 'Quito', address: 'Calle C' },
      { _id: 4, name: 'Cuenca', address: 'Calle D' },
      { _id: 5, name: 'Guayaquil', address: 'Calle E' },
      { _id: 6, name: 'Ambato', address: 'Calle A' },
      { _id: 7, name: 'Riobamba', address: 'Calle B' },
      { _id: 8, name: 'Quito', address: 'Calle C' },
      { _id: 9, name: 'Cuenca', address: 'Calle D' },
      { _id: 10, name: 'Guayaquil', address: 'Calle E' },
      { _id: 11, name: 'Ambato', address: 'Calle A' },
      { _id: 12, name: 'Riobamba', address: 'Calle B' },
      { _id: 13, name: 'Quito', address: 'Calle C' },
      { _id: 14, name: 'Cuenca', address: 'Calle D' },
      { _id: 15, name: 'Guayaquil', address: 'Calle E' },
    ];
  }

  saveToLocalStorage() {
    localStorage.setItem('agencies', JSON.stringify(this.data));
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
        const agencia = { ...response };
        this.data = this.data.map(ind => ind._id === agencia._id ? agencia : ind);
        this.saveToLocalStorage();
        this.loadAgencies();  // Mantener la página actual
        this.showMessage('Registro actualizado');
      } else {
        const lastId = this.data[this.data.length - 1]._id;
        const agencia = { ...response, _id: lastId + 1 };
        this.data.push(agencia);
        this.totalRecords = this.data.length;
        this.saveToLocalStorage();
        this.loadAgencies();  // Mantener la página actual
        this.showMessage('Registro exitoso');
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Agencias", "agencias", this.data);
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
