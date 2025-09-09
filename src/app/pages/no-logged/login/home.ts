import { Component } from '@angular/core';
import { Header } from '../../../components/not-logged/header/header';
import { Login } from "../../../components/not-logged/login/login";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Login, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
      