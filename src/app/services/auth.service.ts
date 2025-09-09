import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { EnvironmentService } from './environment.service';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    // Verificar se há token salvo no localStorage
    this.checkStoredAuth();
  }

  // Login
  login(credentials: LoginRequest): Observable<any> {
    const url = `${this.environment.apiUrl}/auth/login`;
    return this.http.post<any>(url, credentials).pipe(
      tap(response => {
        // Se a resposta só tem token, cria um usuário temporário
        if (response.token && !response.user) {
          const tempUser: User = {
            id: 'temp',
            email: credentials.email,
            name: credentials.email.split('@')[0] // Usa parte do email como nome
          };
          this.setAuthData(tempUser, response.token);
        } else if (response.user && response.token) {
          this.setAuthData(response.user, response.token);
        }
      })
    );
  }

  // Registro
  register(userData: RegisterRequest): Observable<AuthResponse> {
    const url = `${this.environment.apiUrl}/auth/register`;
    return this.http.post<AuthResponse>(url, userData).pipe(
      tap(response => {
        this.setAuthData(response.user, response.token);
      })
    );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  // Verificar se está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Verificação de token (apenas presença no localStorage)
  hasValidToken(): Observable<boolean> {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    // Verifica se existe token e usuário no localStorage
    if (token && user) {
      return of(true);
    }
    
    // Se não tem token ou usuário, limpa dados inválidos
    if (!token || !user) {
      this.logout();
      return of(false);
    }
    
    return of(false);
  }

  // Obter usuário atual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Obter token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Verificar autenticação armazenada
  private checkStoredAuth(): void {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('current_user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error);
        this.logout();
      }
    }
  }

  // Salvar dados de autenticação
  private setAuthData(user: User, token: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Verificar se está em ambiente de desenvolvimento
  isDevelopment(): boolean {
    return !this.environment.isProduction;
  }

  // Obter URL base da aplicação
  getBaseUrl(): string {
    return this.environment.baseUrl;
  }
}
