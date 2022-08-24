import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() userData = { FavoriteMovies: [] };
  movies: any[] = [];
  favsList: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((re: any) => {
      this.userData = re;
      this.favsList = this.userData.FavoriteMovies;
      console.log(this.userData.FavoriteMovies);
      return this.userData;
    });
  }
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  addFav(id: any): void {
    console.log(id);
    this.favsList.map((fav) => {
      console.log(fav);
      if (fav === id) {
        this.snackBar.open('Movie ALREADY a favorite!', 'OK', {
          duration: 2000,
        });
      } else {
        this.fetchApiData.addFavMovie(id).subscribe((result) => {
          return result;
        });
        this.snackBar.open('Movie added to favorites successfully!', 'OK', {
          duration: 2000,
        });
        this.ngOnInit();
      }
    });
  }

  getGenre(genre: any): void {
    this.fetchApiData.getGenre(genre).subscribe((result) => {
      console.log(result);
    });
  }
}
