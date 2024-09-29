import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { FormComponent } from './form/form.component';
import { PageListComponent } from './page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FormComponent,
    PageListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
