import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'qr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  title=""
  group!:FormGroup

  constructor(
    private reference:MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){
      this.title = data ? "EDITAR" : "NUEVO"
  }

  ngOnInit(){
    this.loadForm()
  }

  save(){
    const record = this.group.value
    this.reference.close(record)
  }

  loadForm(){
    console.log(this.data)
    this.group = new FormGroup({
      _id: new FormControl(this.data?._id),
      name: new FormControl(this.data?.name, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(this.data?.description, [Validators.required, Validators.minLength(4)]),
    })
  }
}
