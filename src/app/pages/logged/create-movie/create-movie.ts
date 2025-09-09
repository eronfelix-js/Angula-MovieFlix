import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreateMovieModal } from "../../../components/logged/create-movie-modal/create-movie-modal";


@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [RouterLink, CreateMovieModal, RouterOutlet],
  templateUrl: './create-movie.html',
  styleUrl: './create-movie.css'
})
export class CreateMovie {

}
