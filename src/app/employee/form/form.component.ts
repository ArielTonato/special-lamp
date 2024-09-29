import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'qr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  title = "";
  group!: FormGroup;
  isEditing: boolean;

  constructor(
    private reference: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEditing = !!data;
    this.title = this.isEditing ? "EDITAR" : "NUEVO";
  }

  ngOnInit() {
    this.loadForm();
  }

  save() {
    const formValue = this.group.value;
    const record = {
      ...formValue,
      cedula: this.group.get('cedula')?.value
    };
    this.reference.close(record);
  }

  loadForm() {
    this.group = new FormGroup({
      _id: new FormControl(this.data?._id),
      cedula: new FormControl({
        value: this.data?.cedula,
        disabled: this.isEditing
      }, [Validators.required, Validators.minLength(10)]),
      name: new FormControl(this.data?.name, [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl(this.data?.lastName, [Validators.required, Validators.minLength(4)]),
      address: new FormControl(this.data?.address, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(this.data?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data?.phone, [Validators.required, Validators.minLength(10)]),
    });
  }
}