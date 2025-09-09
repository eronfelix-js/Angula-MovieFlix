import { Component } from '@angular/core';
import { Header } from '../../../components/not-logged/header/header';
import { SingIn } from "../../../components/not-logged/sing-in/sing-in";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Header, SingIn, RouterOutlet],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}
