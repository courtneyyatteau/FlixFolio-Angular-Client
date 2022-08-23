import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((re: any) => {
      this.userData = re;
      console.log(this.userData);
      return this.userData;
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((re: any) => {
      this.userData = re;
      console.log(re);
      this.snackBar.open('Updated profile successfully!', 'OK', {
        duration: 2000,
      });
    });
  }

  getFavorites(): void {
    this.router.navigate(['favorites']);
  }

  getProfile(): void {
    this.router.navigate(['profile']);
  }
}
