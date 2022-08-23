import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router, public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  openMoviesView(): void {
    this.router.navigate(['movies']);
  }

  openUserProfile(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    this.router.navigate(['welcome']);
    this.snackBar.open('You have successfully logged out', 'OK', {
      duration: 2000,
    });
  }
}
