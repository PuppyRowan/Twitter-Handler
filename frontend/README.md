# Twitter Handler Frontend

A React-based frontend for the Twitter Handler system - a Handler-controlled application for converting voice recordings to Twitter posts.

## 🚀 Features

- **Voice Recording**: Record audio that gets transcribed and converted to tweets
- **Text Submission**: Submit text directly for AI caption generation  
- **Handler Dashboard**: Review, edit, and manage all submissions and posts
- **System Overview**: Monitor performance and activity analytics
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Chakra UI** - Component library and design system
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Framer Motion** - Animations (via Chakra UI)
- **React Audio Voice Recorder** - Voice recording component

## 📦 Installation

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Start development server**:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`.

## 🎨 Theme & Styling

The app uses a custom Chakra UI theme with:
- **Dark mode support** - Toggle between light/dark themes
- **Custom colors** - Handler-specific brand colors
- **Responsive design** - Mobile-first approach
- **Component variants** - Consistent styling across components

### Color Scheme
- **Handler Red**: Primary brand color for Handler actions
- **Blue**: Secondary actions and info
- **Twitter Blue**: Twitter-specific elements
- **Status Colors**: Green (success), Yellow (pending), Red (error)

## 📱 Pages & Components

### Pages
- **HomePage** - Landing page with feature overview
- **VoiceRecorderPage** - Audio recording and processing
- **TextSubmissionPage** - Direct text input for caption generation
- **DashboardPage** - Queue management and post review
- **OverviewPage** - System statistics and activity monitoring

### Components
- **Navbar** - Navigation with responsive menu
- **ErrorBoundary** - Error handling wrapper
- **DashboardComponents** - Stats cards, activity feeds, system status
- **Audio Recorder Integration** - Voice recording UI

## 🔌 API Integration

The frontend communicates with the FastAPI backend through:

- **Audio Submission**: `POST /submit/audio`
- **Text Submission**: `POST /submit/text`
- **Queue Management**: `GET /queue`, `PUT /queue/{id}`
- **Post Actions**: `POST /queue/{id}/approve`, `POST /queue/{id}/post`
- **System Status**: `GET /status`, `GET /analytics`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js
│   ├── ErrorBoundary.js
│   └── DashboardComponents.js
├── pages/              # Page components
│   ├── HomePage.js
│   ├── VoiceRecorderPage.js
│   ├── TextSubmissionPage.js
│   ├── DashboardPage.js
│   └── OverviewPage.js
├── services/           # API and external services
│   └── api.js
├── theme.js           # Chakra UI theme configuration
├── App.js            # Main app component
└── index.js          # App entry point
```

## 🔧 Configuration

### Environment Variables

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:8000

# Feature Flags
REACT_APP_ENABLE_DARK_MODE=true
REACT_APP_ENABLE_DIRECT_POSTING=false
REACT_APP_ENABLE_ANALYTICS=true

# Development
REACT_APP_DEBUG=true
REACT_APP_LOG_LEVEL=debug
```

### Build Settings

- **Development**: `npm start` (port 3000)
- **Production**: `npm run build`
- **Testing**: `npm test`

## 📋 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (⚠️ irreversible)

## 🎯 Usage

### For Maple (Submitter)
1. Navigate to **Voice Recorder** or **Text Submission**
2. Choose desired tone (cruel, clinical, teasing, possessive)
3. Record audio or enter text
4. Review generated caption
5. Submit for Handler review

### For Handler (Admin)
1. Navigate to **Dashboard** to review queue
2. Use **Overview** to monitor system performance
3. Approve/reject/edit submissions
4. Post approved content to Twitter
5. Monitor activity and analytics

## 🔒 Security Considerations

- No sensitive data stored in frontend
- API calls use HTTPS in production
- Authentication tokens handled securely
- Input validation and sanitization
- Error boundary prevents crashes

## 🚀 Deployment

1. **Build production bundle**:
   ```bash
   npm run build
   ```

2. **Serve static files**:
   - Use nginx, Apache, or CDN
   - Configure for SPA routing
   - Set up HTTPS

3. **Environment Variables**:
   - Update API URLs for production
   - Configure feature flags
   - Set up monitoring

## 🐛 Troubleshooting

### Common Issues

1. **Audio recording not working**:
   - Check browser permissions
   - Ensure HTTPS in production
   - Verify microphone access

2. **API connection failed**:
   - Check backend server status
   - Verify CORS configuration
   - Check network connectivity

3. **Build errors**:
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility
   - Verify all dependencies installed

## 🤝 Contributing

1. Follow React best practices
2. Use Chakra UI components
3. Maintain responsive design
4. Add proper error handling
5. Update documentation

## 📄 License

This project is part of the Handler system for @BunnyPupMaple. 

---

*She whimpers. I post. This is not a toy. It is a tool of ownership.* 🐾
