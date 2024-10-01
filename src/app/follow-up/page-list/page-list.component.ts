import { Component, inject, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IFollowUp {
  _id: number;
  id_complaint: number;       
  followUpStatus: string;     
  followUpDate: string;       
  followUpComments: string;   
  followUpBy: string;         
  actionsTaken: string;    
}   


@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IFollowUp[] = this.getDataFromLocalStorage();

  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "id_complaint", title: "ID Reclamo" },
    { field: "followUpStatus", title: "Estado" },
    { field: "followUpDate", title: "Fecha de Seguimiento" },
    { field: "followUpComments", title: "Comentarios" },
    { field: "followUpBy", title: "Responsable" },
    { field: "actionsTaken", title: "Acciones Tomadas" }
  ];

  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ];

  records: IFollowUp[] = [];
  paginatedData: IFollowUp[] = []; 
  totalRecords = this.data.length;
  currentPage = 0;  

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.saveToLocalStorage();
    this.loadFollowUps();
  }

  loadFollowUps() {
    this.records = this.data;
    this.changePage(this.currentPage);  
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id);
    this.data.splice(position, 1);  // Eliminar el registro
    this.totalRecords = this.data.length;
    this.saveToLocalStorage();
    this.loadFollowUps();  
    this.showMessage('Registro eliminado');
  }

  getDataFromLocalStorage() {
    const followUps = localStorage.getItem('followUps');
    return followUps ? JSON.parse(followUps) : [
      { _id: 1, id_complaint: 101, followUpStatus: 'Pendiente', followUpDate: '2023-09-28', followUpComments: 'Esperando respuesta del cliente', followUpBy: 'Juan Pérez', actionsTaken: 'Revisión inicial' },
      { _id: 2, id_complaint: 102, followUpStatus: 'En proceso', followUpDate: '2023-09-29', followUpComments: 'El cliente fue contactado para más detalles', followUpBy: 'María Gómez', actionsTaken: 'Se solicitaron más pruebas' }
    ];
  }

  saveToLocalStorage() {
    localStorage.setItem('followUps', JSON.stringify(this.data));
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
        const followUp = { ...response };
        this.data = this.data.map(ind => ind._id === followUp._id ? followUp : ind);
        this.saveToLocalStorage();
        this.loadFollowUps();  
        this.showMessage('Registro actualizado');
      } else {
        const lastId = this.data[this.data.length - 1]._id;
        const followUp = { ...response, _id: lastId + 1 };
        this.data.push(followUp);
        this.totalRecords = this.data.length;
        this.saveToLocalStorage();
        this.loadFollowUps();  
        this.showMessage('Registro exitoso');
      }
    });
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Seguimientos", "followUps", this.data);
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
