
import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genres: Genre[] = []

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovieGenre()
  }


  getMovieGenre(){
    this.moviesService.getMovieGenres().subscribe(genresData=>{
      this.genres = genresData
    })
  }

}
