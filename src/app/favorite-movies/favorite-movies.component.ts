import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit {
  @Input() userData = { FavoriteMovies: [] };
  movies: any[] = [];
  favsList: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.getListFavorites();
  }

  getFavorites(): void {
    this.router.navigate(['favorites']);
  }

  getProfile(): void {
    this.router.navigate(['profile']);
  }

  getUserData() {
    this.fetchApiData.getFavMovies().subscribe((re: any) => {
      this.userData = re;
      console.log(this.userData);
      return this.userData;
    });
  }

  getListFavorites() {
    this.fetchApiData.getAllMovies().subscribe((re: any) => {
      this.movies = re;
      this.movies.map((movie) => {
        if (
          movie._id ===
          this.userData.FavoriteMovies.find(
            (favorite) => favorite === movie._id
          )
        ) {
          //console.log(movie);
          this.favsList.push(movie);
          return movie;
        }
      });
    });
    console.log(this.favsList);
    return this.favsList;
  }

  removeFav(id: any) {
    this.fetchApiData.getAllMovies().subscribe((re: any) => {
      this.movies = re;
      this.movies.map((movie) => {
        if (movie._id === id) {
          this.fetchApiData.deleteFavMovie(id).subscribe((re: any) => {
            id = re;
            console.log(id);
          });
        }
      });
      this.snackBar.open('Movie removed from favorites successfully!', 'OK', {
        duration: 2000,
      });
      this.router.navigate(['profile']);
    });
  }
}
