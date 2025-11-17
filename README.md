# LearnDS - Modern Angular 17+ Learning Platform

A stunning, production-ready Angular 17+ application with a Neo-Noir Dark Mode theme. Built using standalone components and Tailwind CSS for a modern, lightweight, and highly responsive user experience.

## 🎨 Features

### Neo-Noir Dark Mode Theme
- Deep dark background (`#0B0F19`) for reduced eye strain
- Vibrant electric blue (`#3b82f6`) primary accent
- Modern red (`#ef4444`) secondary accent
- Multi-layered shadows with glowing effects for 3D depth
- Custom scrollbar styling

### Components & Pages
- **Home**: Hero section with feature cards and statistics
- **Services**: Service listings with mock API integration
- **About Us**: Mission, values, and team showcase
- **Compilers**: Multi-language online compiler showcase
- **Chat**: Real-time mentor chat interface (mock implementation)

### Technical Highlights
- ✅ Angular 17+ with Standalone Components
- ✅ Tailwind CSS for utility-first styling
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ TypeScript for type safety
- ✅ RxJS for reactive programming
- ✅ HttpClient integration
- ✅ Modern routing with lazy loading support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

The application will be available at `http://localhost:4200`

## 📁 Project Structure

```
src/
├── app/
│   ├── layout/           # Main layout component
│   ├── navbar/           # Sticky navigation bar
│   ├── footer/           # Footer component
│   ├── pages/
│   │   ├── home/         # Landing page
│   │   ├── services/     # Services showcase
│   │   ├── about-us/     # About page
│   │   ├── compilers/    # Compiler listings
│   │   └── chat/         # Mentor chat interface
│   ├── services/
│   │   └── data.service.ts  # Mock API service
│   ├── app.config.ts     # App configuration
│   └── app.routes.ts     # Route definitions
├── styles.scss           # Global styles
└── index.html            # Main HTML file
```

## 🎨 Tailwind Configuration

Custom theme extensions in `tailwind.config.js`:
- **Colors**: `neo-dark`, `neo-blue`, `neo-red`
- **Shadows**: `shadow-neo`, `shadow-neo-hover`
- **Fonts**: Inter from Google Fonts

## 🔧 Configuration Files

### angular.json
- Font optimization disabled for external fonts
- SCSS as the default style language
- Production build optimizations

### tailwind.config.js
- Custom Neo-Noir color palette
- Extended box shadows for depth effects
- Inter font family integration

## 📸 Screenshots

### Home Page
Beautiful hero section with gradient text and feature cards

### Services Page  
Service listings fetched from mock API with loading states

### Chat Interface
Real-time chat UI ready for WebSocket/Socket.IO integration

### Compilers Page
Multi-language compiler showcase with colorful buttons

## 🌟 Key Features

### Responsive Navigation
- Sticky header with backdrop blur
- Mobile hamburger menu
- Active route highlighting
- Prominent CTA button

### Mock API Integration
- DataService with Observable pattern
- Simulated API delays
- Error handling
- Service injection demonstration

### Chat Component
- Message history display
- Text input with keyboard shortcuts
- Mock message sending
- Prepared for real-time backend integration

## 🚀 Deployment

```bash
# Build for production
npm run build

# Output will be in dist/temp-app
```

Deploy the `dist/temp-app` directory to your hosting provider.

## 🛠️ Technologies Used

- **Angular 17**: Latest Angular with standalone components
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Strongly typed JavaScript
- **RxJS**: Reactive Extensions for JavaScript
- **SCSS**: Enhanced CSS with variables and nesting

## 📝 Future Enhancements

- [ ] Connect chat to real-time backend (WebSocket/Socket.IO)
- [ ] Implement actual online compilers
- [ ] Add user authentication
- [ ] Integrate with backend API
- [ ] Add more interactive coding challenges
- [ ] Implement dark/light mode toggle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👥 Authors

Built with ❤️ by the LearnDS Team
