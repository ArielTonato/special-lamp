import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrRoutingModule } from './qr-routing.module';
import { FormComponent } from './form/form.component';
import { PageListComponent } from './page-list/page-list.component';


@NgModule({
  declarations: [
    FormComponent,
    PageListComponent
  ],
  imports: [
    CommonModule,
    QrRoutingModule
  ]
})
export class QrModule { }
