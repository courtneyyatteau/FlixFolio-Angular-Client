import { Component, OnInit, Input } from '@angular/core';

// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open('user logged in successfully!', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
