import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { PageListComponent } from './page-list/page-list.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PageListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    SharedModule
  ]
})
export class AgencyModule { }
