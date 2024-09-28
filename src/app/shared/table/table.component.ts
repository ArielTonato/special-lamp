import { Component, ContentChildren, Input, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { MetaDataColumn } from '../interfaces/metacolumn.interface';

@Component({
  selector: 'qr-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() data:any
  @Input() metaDataColumns!:MetaDataColumn[]
  columns:string[] = []

  @ContentChildren(MatColumnDef,{descendants:true}) columnsDef!:QueryList<MatColumnDef>
  @ViewChild(MatTable,{static:true}) table!:MatTable<any>

  ngOnChanges(changes:SimpleChanges){
    if(changes['metaDataColumns']){
      this.columns = this.metaDataColumns.map((x)=>x.field)
    }
  }

  ngAfterContentInit(){
    if(!this.columnsDef){return}
    this.columnsDef.forEach(columnDef => {
      this.columns.push(columnDef.name)
      this.table.addColumnDef(columnDef)
    })
  }
}
