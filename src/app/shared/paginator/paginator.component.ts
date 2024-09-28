import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'qr-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Output() onChangePage:EventEmitter<number> = new EventEmitter<number>()
  @Input() length!:number
  pageSize = environment.PAGE_SIZE
  currentPage = 0

  changePage(event:PageEvent){
    this.currentPage = event.pageIndex ?? 0
    this.onChangePage.emit(this.currentPage)
  }
}
