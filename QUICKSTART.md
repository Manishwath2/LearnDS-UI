# Quick Start Guide

Get started with LearnDS-UI in 5 minutes!

## 🚀 Quick Setup

```bash
# 1. Clone the repository
git clone https://github.com/Manishwath2/LearnDS-UI.git
cd LearnDS-UI

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open browser
# Navigate to http://localhost:4200
```

## 📝 Quick Examples

### Example 1: Using the AI Service

Create a component that uses AI:

```typescript
import { Component } from '@angular/core';
import { AiService } from './core/services/ai.service';

@Component({
  selector: 'app-ai-chat',
  template: `
    <div>
      <button (click)="askAI()">Ask AI</button>
      <p>{{ response }}</p>
    </div>
  `
})
export class AiChatComponent {
  response = '';
  
  constructor(private aiService: AiService) {}
  
  askAI() {
    this.aiService.chat({
      prompt: 'What is a binary tree?',
      context: 'Data structures tutorial'
    }).subscribe(res => {
      this.response = res.data?.response || '';
    });
  }
}
```

### Example 2: Fetching Data from Backend

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from './core/services/data.service';

@Component({
  selector: 'app-modules-list',
  template: `
    <div *ngFor="let module of modules">
      {{ module.title }}
    </div>
  `
})
export class ModulesListComponent implements OnInit {
  modules: any[] = [];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    this.dataService.getLearningModules(1, 10)
      .subscribe(res => {
        this.modules = res.data || [];
      });
  }
}
```

### Example 3: User Authentication

```typescript
import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <input [(ngModel)]="email" placeholder="Email">
    <input [(ngModel)]="password" type="password" placeholder="Password">
    <button (click)="login()">Login</button>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  login() {
    this.authService.login({ 
      email: this.email, 
      password: this.password 
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Login failed: ' + err.message);
      }
    });
  }
}
```

## ⚙️ Configuration

### 1. Set Your API URLs

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',        // Your backend
  aiApiUrl: 'http://localhost:3000/api/ai',   // Your AI endpoint
  apiTimeout: 30000,
  enableLogging: true,
  appName: 'LearnDS-UI',
  version: '1.0.0'
};
```

### 2. Update API Endpoints (Optional)

If your API has different endpoint structure, edit `src/app/core/constants/api.constants.ts`.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --code-coverage
```

## 🏗️ Building for Production

```bash
# Build for production
npm run build

# Output will be in dist/learnds-ui/
```

## 📁 Project Structure Quick Reference

```
src/app/
├── core/               # Core services and utilities
│   ├── services/      # API services (AI, Data, Auth)
│   ├── models/        # TypeScript interfaces
│   ├── interceptors/  # HTTP interceptors
│   └── constants/     # API endpoints
├── features/          # Feature modules
└── environments/      # Environment configs
```

## 🎯 Common Tasks

### Add a New Service

```typescript
// src/app/core/services/my-service.ts
import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';

@Injectable({ providedIn: 'root' })
export class MyService extends BaseHttpService {
  getData() {
    return this.get('/my-endpoint');
  }
}
```

### Add a New Route

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  // Add your routes here
];
```

### Add a New Model

```typescript
// src/app/core/models/my-model.ts
export interface MyModel {
  id: string;
  name: string;
  // ... other fields
}
```

## 🔧 Useful Commands

```bash
npm start              # Start dev server
npm run build          # Build for production
npm test               # Run tests
npm run watch          # Build in watch mode
ng generate component my-component  # Generate component
ng generate service my-service      # Generate service
```

## 📚 Learn More

- **Full Documentation**: See [README.md](./README.md)
- **Detailed Guide**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Angular Docs**: https://angular.io/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 4200
npx kill-port 4200
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Angular cache
rm -rf .angular/cache
npm run build
```

## 💡 Tips

1. **Use Async Pipe**: Prefer `{{ data$ | async }}` over manual subscription
2. **Type Everything**: Always define interfaces for your data
3. **Error Handling**: Always handle errors in subscribe blocks
4. **Unsubscribe**: Use `takeUntil` or async pipe to prevent memory leaks
5. **Environment Variables**: Never hardcode URLs, use environment files

## 🎉 You're Ready!

Start building your learning platform. The architecture is set up for scalability and maintainability.

Happy coding! 🚀
