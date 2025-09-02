import { Component } from '@angular/core';
import { Header } from '../../../components/not-logged/header/header';
import { Login } from "../../../components/not-logged/login/login";

@Component({
  selector: 'app-home',
  imports: [Header, Login],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
      