import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelRoutingModule } from './channel-routing.module';
import { FormComponent } from './form/form.component';
import { PageListComponent } from './page-list/page-list.component';


@NgModule({
  declarations: [
    FormComponent,
    PageListComponent
  ],
  imports: [
    CommonModule,
    ChannelRoutingModule
  ]
})
export class ChannelModule { }
