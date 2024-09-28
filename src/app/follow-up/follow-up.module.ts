import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowUpRoutingModule } from './follow-up-routing.module';
import { PageListComponent } from './page-list/page-list.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    PageListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FollowUpRoutingModule
  ]
})
export class FollowUpModule { }
