# LearnDS-UI Setup Guide

This guide will help you set up and understand the Angular 18 architecture for LearnDS-UI.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Service Layer](#service-layer)
3. [AI API Integration](#ai-api-integration)
4. [Database Integration](#database-integration)
5. [Authentication Flow](#authentication-flow)
6. [Best Practices](#best-practices)

## Architecture Overview

The project follows a **service-oriented architecture** with the following layers:

```
┌─────────────────────────────────────────┐
│         Components (UI Layer)           │
├─────────────────────────────────────────┤
│      Services (Business Logic)          │
│  - AiService                            │
│  - DataService                          │
│  - AuthService                          │
├─────────────────────────────────────────┤
│    BaseHttpService (HTTP Layer)         │
├─────────────────────────────────────────┤
│    HTTP Interceptors (Middleware)       │
│  - Auth Interceptor                     │
│  - Error Interceptor                    │
├─────────────────────────────────────────┤
│      Backend API / AI Services          │
└─────────────────────────────────────────┘
```

## Service Layer

### BaseHttpService

The base HTTP service provides common functionality for all API services:

- HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Automatic authentication token injection
- Error handling
- Request timeout management

**Location**: `src/app/core/services/base-http.service.ts`

### How to Create a New Service

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class MyNewService extends BaseHttpService {
  
  // Your custom methods here
  getData(id: string): Observable<ApiResponse<any>> {
    return this.get<ApiResponse<any>>(`/my-endpoint/${id}`);
  }
  
  createData(data: any): Observable<ApiResponse<any>> {
    return this.post<ApiResponse<any>>('/my-endpoint', data);
  }
}
```

## AI API Integration

### Supported AI Providers

The AI service is designed to work with various AI providers:

1. **OpenAI** (GPT-3.5, GPT-4)
2. **Google Gemini**
3. **Anthropic Claude**
4. **Custom AI Models**

### Setting Up AI Integration

#### Step 1: Update Environment Configuration

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  aiApiUrl: 'https://api.openai.com/v1',  // or your AI API URL
  // ... other config
};
```

#### Step 2: Configure API Endpoints

```typescript
// src/app/core/constants/api.constants.ts
export const API_ENDPOINTS = {
  AI: {
    CHAT: '/chat/completions',  // OpenAI endpoint
    GENERATE: '/generations',
    // ... other endpoints
  }
};
```

#### Step 3: Use AI Service in Components

```typescript
import { Component } from '@angular/core';
import { AiService } from '../../core/services/ai.service';

@Component({
  selector: 'app-my-component',
  // ...
})
export class MyComponent {
  constructor(private aiService: AiService) {}
  
  askAI() {
    this.aiService.chat({
      prompt: 'What is a linked list?',
      context: 'Explaining to beginners',
      parameters: {
        temperature: 0.7,
        maxTokens: 200,
        model: 'gpt-3.5-turbo'
      }
    }).subscribe({
      next: (response) => {
        console.log(response.data?.response);
      },
      error: (error) => {
        console.error('AI Error:', error);
      }
    });
  }
}
```

### AI Service Methods

| Method | Purpose | Example Use Case |
|--------|---------|------------------|
| `chat()` | Conversational AI | Chat interface, Q&A |
| `generate()` | Content generation | Create lesson plans, exercises |
| `analyze()` | Content analysis | Code review, essay evaluation |
| `explain()` | Concept explanation | Teaching complex topics |

## Database Integration

### Backend API Setup

The DataService is designed to work with RESTful APIs. Here's how to connect it:

#### Step 1: Update API Base URL

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',  // Your backend API
  // ...
};
```

#### Step 2: Define API Endpoints

```typescript
// src/app/core/constants/api.constants.ts
export const API_ENDPOINTS = {
  MODULES: {
    LIST: '/modules',
    DETAIL: (id: string) => `/modules/${id}`,
    CREATE: '/modules',
    UPDATE: (id: string) => `/modules/${id}`,
    DELETE: (id: string) => `/modules/${id}`
  },
  // Add more endpoints as needed
};
```

#### Step 3: Use DataService

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-modules',
  // ...
})
export class ModulesComponent implements OnInit {
  modules: any[] = [];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    this.loadModules();
  }
  
  loadModules() {
    this.dataService.getLearningModules(1, 10, {
      category: 'Data Structures',
      difficulty: 'beginner'
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.modules = response.data || [];
        }
      },
      error: (error) => {
        console.error('Error loading modules:', error);
      }
    });
  }
  
  createModule() {
    const newModule = {
      title: 'Arrays and Lists',
      description: 'Introduction to arrays',
      category: 'Data Structures',
      difficulty: 'beginner' as const
    };
    
    this.dataService.createLearningModule(newModule).subscribe({
      next: (response) => {
        console.log('Module created:', response.data);
        this.loadModules();  // Reload list
      }
    });
  }
}
```

### Pagination Support

The DataService includes built-in pagination support:

```typescript
this.dataService.getLearningModules(
  page: 1,           // Current page
  pageSize: 10,      // Items per page
  filters: {         // Optional filters
    category: 'Data Structures',
    difficulty: 'beginner'
  }
).subscribe(response => {
  console.log('Data:', response.data);
  console.log('Pagination:', response.meta);
  // meta includes: currentPage, totalPages, totalItems, hasNextPage, etc.
});
```

## Authentication Flow

### Setting Up Authentication

#### Step 1: Configure Auth Endpoints

```typescript
// src/environments/environment.ts
export const environment = {
  apiUrl: 'http://localhost:3000/api',
  // ...
};

// Auth endpoints are already configured in api.constants.ts
```

#### Step 2: Implement Login

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  // ...
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  login(email: string, password: string) {
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('User logged in:', response.data?.user);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
  
  register(data: any) {
    this.authService.register(data).subscribe({
      next: (response) => {
        console.log('User registered:', response.data?.user);
        this.router.navigate(['/dashboard']);
      }
    });
  }
  
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}
```

#### Step 3: Protect Routes with Guards

Create an auth guard:

```typescript
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
```

Use in routes:

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]  // Protected route
  }
];
```

### Token Management

The AuthService automatically:
- Stores tokens in localStorage
- Adds tokens to HTTP requests via interceptor
- Manages user state with RxJS observables
- Handles token refresh

```typescript
// Check authentication status
this.authService.isAuthenticated$.subscribe(isAuth => {
  console.log('Authenticated:', isAuth);
});

// Get current user
this.authService.currentUser$.subscribe(user => {
  console.log('Current user:', user);
});
```

## Best Practices

### 1. Error Handling

Always handle errors in service calls:

```typescript
this.dataService.getData().subscribe({
  next: (response) => {
    // Handle success
  },
  error: (error) => {
    // Handle error
    console.error('Error:', error);
    // Show user-friendly message
  }
});
```

### 2. Loading States

Manage loading states in components:

```typescript
export class MyComponent {
  isLoading = false;
  
  loadData() {
    this.isLoading = true;
    this.dataService.getData().subscribe({
      next: (response) => {
        // Process data
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }
}
```

### 3. Unsubscribe from Observables

Use async pipe or unsubscribe to prevent memory leaks:

```typescript
// Option 1: Async pipe (recommended)
// In template: {{ data$ | async }}
data$ = this.dataService.getData();

// Option 2: Manual unsubscribe
import { Subject, takeUntil } from 'rxjs';

export class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    this.dataService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // Handle data
      });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 4. Type Safety

Always use TypeScript interfaces:

```typescript
// Good
interface MyData {
  id: string;
  name: string;
}

this.dataService.getData<MyData>().subscribe(response => {
  console.log(response.data?.name);  // Type-safe
});

// Bad
this.dataService.getData().subscribe((response: any) => {
  console.log(response.data.name);  // Not type-safe
});
```

### 5. Environment-Specific Configuration

Never hardcode API URLs:

```typescript
// Bad
const API_URL = 'http://localhost:3000';

// Good
import { environment } from '../environments/environment';
const API_URL = environment.apiUrl;
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors, configure your backend to allow requests from your Angular app:

```typescript
// Backend (Express example)
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

### API Connection Issues

1. Check environment configuration
2. Verify API endpoints in constants
3. Check browser console for errors
4. Use browser DevTools Network tab to inspect requests

### Authentication Issues

1. Verify token is stored in localStorage
2. Check if interceptor is adding Authorization header
3. Verify backend accepts Bearer token format

## Next Steps

1. **Create Feature Modules**: Organize your app into feature modules
2. **Add State Management**: Consider NgRx or Akita for complex state
3. **Implement Real-time Features**: Use WebSockets for live updates
4. **Add Progressive Web App**: Make the app installable
5. **Optimize Performance**: Lazy loading, code splitting

## Resources

- [Angular Documentation](https://angular.io/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular Best Practices](https://angular.io/guide/styleguide)

---

For questions or issues, please open a GitHub issue.
