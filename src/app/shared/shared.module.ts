import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { DownloadComponent } from './download/download.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { TableComponent } from './table/table.component';
import { TitleComponent } from './title/title.component';
import { KeypadButtonComponent } from './keypad-button/keypad-button.component';
import { TestComponent } from './test/test.component';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { NgScrollbarModule } from "ngx-scrollbar";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatListModule } from "@angular/material/list";
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'




@NgModule({
  declarations: [
    ContainerComponent,
    DownloadComponent,
    PaginatorComponent,
    TableComponent,
    TitleComponent,
    KeypadButtonComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatListModule
  ],
  exports: [
    ContainerComponent,
    DownloadComponent,
    PaginatorComponent,
    TableComponent,
    TitleComponent,
    KeypadButtonComponent,
    TestComponent,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgScrollbarModule,
    HttpClientModule,
    MatSnackBarModule,
  ]
})
export class SharedModule { }
