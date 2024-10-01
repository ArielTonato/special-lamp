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
    
    if (record.date) {
      record.date = this.datePipe.transform(record.date, 'yyyy-MM-dd');
    }

    this.reference.close(record);
  }

  loadForm() {
    this.group = new FormGroup({
      _id: new FormControl(this.data?._id),  // ID del reclamo
      name: new FormControl(this.data?.name, [Validators.required, Validators.minLength(4)]),   
      email: new FormControl(this.data?.email, [Validators.required, Validators.email]),  
      phone: new FormControl(this.data?.phone, [Validators.required, Validators.minLength(10)]),   
      complaintType: new FormControl(this.data?.complaintType, [Validators.required]),   
      description: new FormControl(this.data?.description, [Validators.required, Validators.minLength(10)]),  
      date: new FormControl(this.data?.date, [Validators.required]), 
      channel: new FormControl(this.data?.channel, [Validators.required]),  
    });
  }
}
