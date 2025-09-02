import { Component } from '@angular/core';
import { Header } from '../../../components/not-logged/header/header';
import { SingIn } from '../../../components/not-logged/sing-in/sing-in';

@Component({
  selector: 'app-register',
  imports: [Header, SingIn],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}
