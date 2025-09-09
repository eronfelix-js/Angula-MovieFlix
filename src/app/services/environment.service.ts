import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  
  get apiUrl(): string {
    return environment.apiUrl;
  }

  get baseUrl(): string {
    return environment.baseUrl;
  }

  get movieApiUrl(): string {
    return environment.movieApiUrl;
  }

  get movieApiKey(): string {
    return environment.movieApiKey;
  }

  get isProduction(): boolean {
    return environment.production;
  }

  getEnvironmentInfo(): any {
    return {
      production: environment.production,
      apiUrl: environment.apiUrl,
      baseUrl: environment.baseUrl,
      movieApiUrl: environment.movieApiUrl
    };
  }
}
