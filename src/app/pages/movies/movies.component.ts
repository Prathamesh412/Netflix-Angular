import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  take
} from 'rxjs/operators';
import {
  Movie
} from 'src/app/models/movie';
import {
  MoviesService
} from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  id1: string = '';
  searchValue: string | null = null;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.params.pipe(take(1)).subscribe(({genreId})=>{
    //   console.log("Genre ID" + genreId )
    //   if(genreId){
    //     this.getMoviesByGenre(genreId)
    //   }else{
    //     console.log("inside")
    //     this.getPagedMovies(1);
    //   }
    // }) 
    this.id1 = this.route.snapshot.params['genreId'];
    if (this.id1) {
      this.getMoviesByGenre(this.id1, 1)
    } else {
      this.getPagedMovies(1);
    }

  }

  getMoviesByGenre(id: string, page: number) {
    this.moviesService.getMoviesByGenre(id, page).subscribe(movies => {
      this.movies = movies
    })
  }

  getPagedMovies(page: number, searchKeyword ? : string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe((movies) => {
      this.movies = movies;
    });
  }

  paginate(event: any) {
    if (this.id1) {
      this.getMoviesByGenre(this.id1, event.page + 1)
    } else {
      if(this.searchValue){
        this.getPagedMovies(event.page + 1, this.searchValue);
      }else{
        this.getPagedMovies(event.page + 1)
      }
      
    }
  }

  searchChange() {
    // this.moviesService.searchMovies(page, this.searchValue).subscribe((movies) => {
    //   this.movies = movies;
    // });
    console.log(this.searchValue)
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue)
    }

  }
}