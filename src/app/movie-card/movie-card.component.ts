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
    this.getListFavorites();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((re: any) => {
      this.userData = re;
      console.log(this.userData);
      return this.userData;
    });
  }
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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

  addFav(id: string): void {
    this.fetchApiData.addFavMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
    this.snackBar.open('Movie added to favorites successfully!', 'OK', {
      duration: 2000,
    });
  }

  getGenre(genre: any): void {
    this.fetchApiData.getGenre(genre).subscribe((result) => {
      console.log(result);
    })
  }
}
