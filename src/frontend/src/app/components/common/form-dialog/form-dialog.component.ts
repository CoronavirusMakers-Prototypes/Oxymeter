import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl,
  Validators
} from '@angular/forms';
import { MyErrorStateMatcher } from '@class/MyErrosStateMatcher';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

  public type: string;
  public title: string;
  public matcher = new MyErrorStateMatcher();
  public formData: any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.type = data.type ? data.type : 'simple';
      this.title = data.title;
      if(this.type === 'simple'){
        this.formData = {
          description: new FormControl('', [Validators.required, Validators.minLength(3)])
        };
      }
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    let data = {};
    if(this.type === 'simple'){
      data = this.formData.description.value;
    }
    this.dialogRef.close(data);
  }

}
