import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';  // Importar DatePipe

@Component({
  selector: 'qr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]  // Asegurarse de proveer el DatePipe
})
export class FormComponent {
  title = "";
  group!: FormGroup;

  constructor(
    private reference: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe  // Inyectar el DatePipe
  ) {
    this.title = data ? "EDITAR" : "NUEVO";
  }

  ngOnInit() {
    this.loadForm();
  }

  save() {
    let record = this.group.value;
    
    // Formatear la fecha seleccionada en el formato 'YYYY-MM-DD'
    if (record.date) {
      record.date = this.datePipe.transform(record.date, 'yyyy-MM-dd');
    }

    this.reference.close(record);
  }

  loadForm() {
    this.group = new FormGroup({
      _id: new FormControl(this.data?._id),  // ID del reclamo
      name: new FormControl(this.data?.name, [Validators.required, Validators.minLength(4)]),  // Nombre del usuario que hace la queja
      email: new FormControl(this.data?.email, [Validators.required, Validators.email]),  // Email del usuario para seguimiento
      phone: new FormControl(this.data?.phone, [Validators.required, Validators.minLength(10)]),  // Teléfono de contacto del usuario
      complaintType: new FormControl(this.data?.complaintType, [Validators.required]),  // Tipo de queja o reclamo
      description: new FormControl(this.data?.description, [Validators.required, Validators.minLength(10)]),  // Descripción detallada de la queja
      date: new FormControl(this.data?.date, [Validators.required]),  // Fecha de la queja
      channel: new FormControl(this.data?.channel, [Validators.required]),  // Canal a través del cual se presentó la queja
    });
  }
}
