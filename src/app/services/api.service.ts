import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {}

  // Exemplo de método para buscar filmes
  getMovies(): Observable<any> {
    const url = `${this.environment.apiUrl}/movies`;
    return this.http.get(url);
  }

  // Exemplo de método para criar filme
  createMovie(movieData: any): Observable<any> {
    const url = `${this.environment.apiUrl}/movies`;
    return this.http.post(url, movieData);
  }

  // Exemplo de método para buscar filmes da API externa
  searchMovies(query: string): Observable<any> {
    const url = `${this.environment.movieApiUrl}/search/movie`;
    const params = {
      api_key: this.environment.movieApiKey,
      query: query
    };
    return this.http.get(url, { params });
  }

  // Método para verificar se está em produção
  isProduction(): boolean {
    return this.environment.isProduction;
  }
}
