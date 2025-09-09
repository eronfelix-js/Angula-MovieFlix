import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { EnvironmentService } from '../../../services/environment.service';
import { LoginRequest } from '../../../models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    public environment: EnvironmentService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso:', response);
        this.isLoading = false;
        // Redirecionar para a página principal (home)
        console.log('Tentando redirecionar para home...');
        this.router.navigateByUrl('/').then(success => {
          console.log('Redirecionamento:', success ? 'sucesso' : 'falhou');
        }).catch(error => {
          console.error('Erro no redirecionamento:', error);
        });
      },
      error: (error) => {
        console.error('Erro no login:', error);
        if (error?.status === 400 || error?.status === 401) {
          this.errorMessage = 'E-mail ou senha incorretos.';
        } else if (error?.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Erro ao fazer login. Tente novamente.';
        }
        this.isLoading = false;
      }
    });
  }

  // Método para debug em desenvolvimento
  getEnvironmentInfo() {
    if (this.environment.isProduction) {
      return 'Produção';
    }
    return 'Desenvolvimento';
  }
}
