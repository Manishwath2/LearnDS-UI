# LearnDS-UI

Creating a learning platform with a highly responsive Angular 18 project, architected for AI API and database integration.

## 🚀 Features

- **Angular 18** with standalone components
- **TypeScript** with strict type checking
- **Service-oriented architecture** ready for API integration
- **AI Service Layer** for AI API calls (OpenAI, Gemini, Claude, etc.)
- **Data Service Layer** for database/backend operations
- **Authentication Service** with token management
- **HTTP Interceptors** for global request/response handling
- **Environment Configuration** for different deployment environments
- **Type-safe Models** for API responses and data structures

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Manishwath2/LearnDS-UI.git
cd LearnDS-UI
```

2. Install dependencies:
```bash
npm install
```

## 🏃‍♂️ Running the Application

### Development Server
```bash
npm start
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any source files.

### Production Build
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run tests in headless mode:
```bash
npm test -- --no-watch --browsers=ChromeHeadless
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                    # Core module with services, models, interceptors
│   │   ├── services/           
│   │   │   ├── base-http.service.ts    # Base HTTP service for API calls
│   │   │   ├── ai.service.ts           # AI API integration service
│   │   │   ├── data.service.ts         # Database/backend service
│   │   │   └── auth.service.ts         # Authentication service
│   │   ├── models/             
│   │   │   ├── api-response.model.ts   # API response interfaces
│   │   │   ├── ai.model.ts             # AI-related interfaces
│   │   │   └── user.model.ts           # User and domain models
│   │   ├── interceptors/       
│   │   │   └── http.interceptor.ts     # HTTP interceptors
│   │   ├── constants/          
│   │   │   └── api.constants.ts        # API endpoints and constants
│   │   └── index.ts                    # Core exports
│   ├── features/                # Feature modules
│   │   └── demo/                       # Demo component
│   ├── app.component.*          # Root component
│   ├── app.config.ts            # Application configuration
│   └── app.routes.ts            # Application routes
├── environments/                # Environment configurations
│   ├── environment.ts           # Development environment
│   └── environment.prod.ts      # Production environment
└── main.ts                      # Application entry point
```

## 🔌 API Integration

### Environment Configuration

Update the environment files to configure your API endpoints:

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  aiApiUrl: 'http://localhost:3000/api/ai',
  // ... other configurations
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api',
  aiApiUrl: 'https://api.yourdomain.com/api/ai',
  // ... other configurations
};
```

### Using Services

#### AI Service Example
```typescript
import { AiService } from './core/services/ai.service';

constructor(private aiService: AiService) {}

// Chat with AI
this.aiService.chat({
  prompt: 'Explain binary search',
  context: 'Teaching data structures'
}).subscribe(response => {
  console.log(response.data?.response);
});

// Generate content
this.aiService.generate('Create a lesson plan for arrays', {
  maxTokens: 500,
  temperature: 0.7
}).subscribe(response => {
  console.log(response.data?.response);
});
```

#### Data Service Example
```typescript
import { DataService } from './core/services/data.service';

constructor(private dataService: DataService) {}

// Fetch learning modules
this.dataService.getLearningModules(1, 10).subscribe(response => {
  console.log(response.data);
});

// Create a module
this.dataService.createLearningModule({
  title: 'Introduction to Arrays',
  description: 'Learn about arrays',
  category: 'Data Structures',
  difficulty: 'beginner'
}).subscribe(response => {
  console.log(response.data);
});
```

#### Authentication Service Example
```typescript
import { AuthService } from './core/services/auth.service';

constructor(private authService: AuthService) {}

// Login
this.authService.login({
  email: 'user@example.com',
  password: 'password'
}).subscribe(response => {
  console.log('Logged in:', response.data?.user);
});

// Check authentication status
this.authService.isAuthenticated$.subscribe(isAuth => {
  console.log('Is authenticated:', isAuth);
});
```

## 🔐 HTTP Interceptors

The project includes HTTP interceptors that automatically:
- Add authentication tokens to requests
- Handle errors globally
- Log requests in development mode

## 🎨 Customization

### Adding New Services

1. Create a new service in `src/app/core/services/`
2. Extend `BaseHttpService` for API-based services
3. Export the service in `src/app/core/index.ts`

### Adding New Models

1. Create interface files in `src/app/core/models/`
2. Export models in `src/app/core/index.ts`

### Adding API Endpoints

Update `src/app/core/constants/api.constants.ts` with new endpoints.

## 🛠️ Development Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build and watch for changes
- `npm run lint` - Lint the code (if configured)

## 📝 Next Steps

1. **Connect to Backend API**: Update environment files with your actual API URLs
2. **Implement Authentication**: Connect the auth service to your authentication backend
3. **Add AI Integration**: Connect to your preferred AI provider (OpenAI, Gemini, etc.)
4. **Create Feature Modules**: Add your learning platform features
5. **Add UI Components**: Build responsive UI components
6. **Configure Routing**: Set up application routes in `app.routes.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Angular 18

