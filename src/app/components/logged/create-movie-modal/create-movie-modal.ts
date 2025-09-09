import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { EnvironmentService } from '../../../services/environment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-movie-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-movie-modal.html',
  styleUrl: './create-movie-modal.css'
})
export class CreateMovieModal {
  movieData = {
    name: '',
    releaseDate: '',
    provider: '',
    description: '',
    rating: '',
    category: ''
  };

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    public environment: EnvironmentService
  ) {}

  onSubmit() {
    if (!this.movieData.name || !this.movieData.description) {
      this.errorMessage = 'Por favor, preencha pelo menos o nome e descrição do filme';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Usar o ApiService para criar o filme
    this.apiService.createMovie(this.movieData).subscribe({
      next: (response) => {
        console.log('Filme criado com sucesso:', response);
        this.isLoading = false;
        this.successMessage = 'Filme cadastrado com sucesso!';
        this.resetForm();
      },
      error: (error) => {
        console.error('Erro ao criar filme:', error);
        this.errorMessage = error.error?.message || 'Erro ao cadastrar filme. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.movieData = {
      name: '',
      releaseDate: '',
      provider: '',
      description: '',
      rating: '',
      category: ''
    };
  }

  // Método para debug em desenvolvimento
  getEnvironmentInfo() {
    if (this.environment.isProduction) {
      return 'Produção';
    }
    return 'Desenvolvimento';
  }
}
