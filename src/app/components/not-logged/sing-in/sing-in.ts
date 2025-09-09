import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService} from '../../../services/auth.service';
import { EnvironmentService } from '../../../services/environment.service';
import { RegisterRequest } from '../../../models/auth.models';

@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sing-in.html',
  styleUrl: './sing-in.css'
})
export class SingIn {
  registerData: RegisterRequest = {
    name: '',
    email: '',
    password: ''
  };
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    public environment: EnvironmentService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registro realizado com sucesso:', response);
        this.isLoading = false;
        this.successMessage = 'Conta criada com sucesso! Redirecionando...';
        // Redirecionar para a página principal após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erro no registro:', error);
        this.errorMessage = error.error?.message || 'Erro ao criar conta. Tente novamente.';
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
