import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  public messages: Array<string> = [];
  public type: string; // Expected: confirmation || simple

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(Array.isArray(data.message)){
        this.messages = data.message;
      }else{
        this.messages.push(data.message);
      }
      this.type = data.type;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
