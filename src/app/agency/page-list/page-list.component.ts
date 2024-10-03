import { Component, inject, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAgency } from '../interfaces/agency.interface';
import { AgencyService } from '../services/agency.service';



@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IAgency[] = [];
  agencyService = inject(AgencyService);

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
  paginatedData: IAgency[] = [];
  totalRecords = 0;
  currentPage = 0;  

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.saveToLocalStorage();
    this.loadAgencies();
  }

  loadAgencies() {
    this.agencyService.getAgencies().subscribe({
      next:(response) =>{
        this.records = response;
        this.totalRecords = response.length;
        this.changePage(this.currentPage);  
      },
      error:(error) =>{
        console.log(error);
      }
    });
  }

  delete(id: number) {
    this.agencyService.deleteAgency(id).subscribe({
      next:(response) =>{
        console.log(response);
        this.loadAgencies();  
        this.showMessage('Registro eliminado');
      },
      error:(error) =>{
        console.log(error);
      }
    });
    this.saveToLocalStorage();
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
        this.agencyService.updateAgency(response).subscribe({
          next:(response) =>{
            console.log(response);
            this.loadAgencies();  
            this.showMessage('Registro actualizado');
          },
          error:(error) =>{
            console.log(error);
          }
        });
      } else {
        this.agencyService.addAgency(response).subscribe({
          next:(response) =>{
            console.log(response);
            this.loadAgencies();  
            this.showMessage('Registro agregado');
          },
          error:(error) =>{
            console.log(error);
          }
        });
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
    this.currentPage = page;  
    const pageSize = environment.PAGE_SIZE;
    const skip = pageSize * page;
    this.paginatedData = this.records.slice(skip, skip + pageSize);
  }
}
