# Configuração de Environment - MovieFlix

## Arquivos de Environment

### Desenvolvimento (`src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  baseUrl: 'http://localhost:4200',
  movieApiUrl: 'https://api.themoviedb.org/3',
  movieApiKey: 'your-dev-api-key-here'
};
```

### Produção (`src/environments/environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api',
  baseUrl: 'https://your-production-domain.com',
  movieApiUrl: 'https://api.themoviedb.org/3',
  movieApiKey: 'your-production-api-key-here'
};
```

## Como Usar

### 1. Importar o Environment Service
```typescript
import { EnvironmentService } from './services/environment.service';

constructor(private environment: EnvironmentService) {}

// Usar as URLs
const apiUrl = this.environment.apiUrl;
const isProd = this.environment.isProduction;
```

### 2. Usar no ApiService
```typescript
import { ApiService } from './services/api.service';

constructor(private apiService: ApiService) {}

// Buscar filmes
this.apiService.getMovies().subscribe(movies => {
  console.log(movies);
});
```

## Scripts Disponíveis

### Desenvolvimento
```bash
# Servidor de desenvolvimento
npm start

# Build de desenvolvimento
npm run build:dev
```

### Produção
```bash
# Servidor com configuração de produção
npm run start:prod

# Build de produção
npm run build:prod
```

## Configuração do Angular.json

O arquivo `angular.json` foi configurado para:
- Usar `environment.ts` por padrão (desenvolvimento)
- Substituir por `environment.prod.ts` no build de produção
- Otimizar o build de produção

## Variáveis de Ambiente

### Desenvolvimento
- `apiUrl`: URL da API local
- `baseUrl`: URL base da aplicação local
- `movieApiUrl`: URL da API externa de filmes
- `movieApiKey`: Chave da API para desenvolvimento

### Produção
- `apiUrl`: URL da API de produção
- `baseUrl`: URL base da aplicação em produção
- `movieApiUrl`: URL da API externa de filmes
- `movieApiKey`: Chave da API para produção

## Componentes Integrados

### Login (`src/app/components/not-logged/login/`)
- Formulário reativo com validação
- Integração com `AuthService`
- Feedback de loading e erros
- Navegação para registro
- Debug info em desenvolvimento

### Registro (`src/app/components/not-logged/sing-in/`)
- Formulário reativo com validação
- Integração com `AuthService`
- Validação de senha (mínimo 6 caracteres)
- Feedback de loading, sucesso e erros
- Navegação para login
- Debug info em desenvolvimento

### Criar Filme (`src/app/components/logged/create-movie-modal/`)
- Formulário reativo com validação
- Integração com `ApiService`
- Feedback de loading, sucesso e erros
- Reset automático do formulário após sucesso
- Debug info em desenvolvimento

## Serviços Criados

### AuthService (`src/app/services/auth.service.ts`)
- Login e registro de usuários
- Gerenciamento de token e sessão
- Verificação de autenticação
- Logout automático
- Integração com environments

### ApiService (`src/app/services/api.service.ts`)
- CRUD de filmes
- Busca em API externa
- Integração com environments
- Métodos reutilizáveis

## Próximos Passos

1. **Atualizar as URLs**: Substitua as URLs de exemplo pelas suas URLs reais
2. **Configurar API Keys**: Adicione suas chaves de API reais
3. **Implementar Backend**: Crie as rotas de API correspondentes
4. **Testar**: Execute `npm run build:prod` para testar o build de produção
5. **Deploy**: Use o build de produção para deploy em produção
