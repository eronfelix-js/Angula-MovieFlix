import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../../../components/logged/header/header";
import { Card } from "../../../components/logged/card/card";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, Header, Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
