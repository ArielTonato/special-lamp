import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';  

@Component({
  selector: 'qr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]  
})
export class FormComponent {
  title = "";
  group!: FormGroup;

  constructor(
    private reference: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe  
  ) {
    this.title = data ? "EDITAR" : "NUEVO";
  }

  ngOnInit() {
    this.loadForm();
  }

  save() {
    let record = this.group.value;
    if (record.followUpDate) {
      record.followUpDate = this.datePipe.transform(record.followUpDate, 'yyyy-MM-dd');
    }

    this.reference.close(record);
  }

  loadForm() {
    this.group = new FormGroup({
      _id: new FormControl(this.data?._id),  
      id_complaint: new FormControl(this.data?.id_complaint),
      followUpStatus: new FormControl(this.data?.followUpStatus || 'Pendiente', [Validators.required]),  
      followUpDate: new FormControl(this.data?.followUpDate, [Validators.required]),
      followUpComments: new FormControl(this.data?.followUpComments, [Validators.minLength(10)]), 
      followUpBy: new FormControl(this.data?.followUpBy, [Validators.minLength(4)]), 
      actionsTaken: new FormControl(this.data?.actionsTaken, [Validators.minLength(10)]),  
    });
  }
  
}
