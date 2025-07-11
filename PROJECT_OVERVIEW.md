# 🎯 Loqui Events - Complete Project Overview for AI Analysis

## Quick Project Summary

**Loqui Events** is a Norwegian event management platform built with React + TypeScript + Vite, featuring Contentful CMS integration and Stripe payments. The platform allows users to browse events and make bookings through an elegant, mobile-first interface.

**Live Site**: https://loqui-events.netlify.app/

## 🏗 Technical Architecture

### Core Stack
```
Frontend: React 18 + TypeScript + Vite
Styling: Tailwind CSS
CMS: Contentful
Payments: Stripe
Deployment: Netlify
State: React Hooks
Animations: CSS + Intersection Observer
```

### Project Structure Overview
```
├── src/
│   ├── App.tsx                 # Main application component
│   ├── components/             # Reusable UI components
│   │   ├── AnimatedSection.tsx # Scroll animations
│   │   ├── LazyImage.tsx      # Optimized images
│   │   ├── PaymentIcons.tsx   # Payment methods
│   │   └── SocialIcons.tsx    # Social media
│   ├── services/
│   │   └── contentful.ts      # CMS integration
│   ├── hooks/
│   │   ├── useEvents.ts       # Event data management
│   │   └── useIntersectionObserver.ts
│   ├── types/
│   │   └── Event.ts           # TypeScript definitions
│   └── utils/
│       └── markdownParser.ts  # Content processing
├── public/
│   ├── optimized/             # WebP images
│   ├── admin/                 # Netlify CMS (legacy)
│   └── _redirects            # Netlify routing
├── .env                       # Environment variables
└── Documentation files
```

## 🔑 Key Files to Understand

### 1. `/src/App.tsx` - Main Application
**What it does**: Root component containing all application logic
**Key features**:
- Contentful data fetching with error handling
- Responsive navigation with mobile menu
- Hero section with animations
- Event listing with loading states
- Contact form integration
- Full-screen loading spinner for initial load
- Fallback events when Contentful fails

### 2. `/src/services/contentful.ts` - CMS Service
**What it does**: Handles all Contentful CMS interactions
**Key functions**:
- `getEvents()`: Fetches all published events
- `getEvent(id)`: Fetches single event
- Error handling and data transformation
- Type-safe content delivery

### 3. Environment Configuration
**Required variables in `.env`**:
```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

## 📊 Contentful Content Model

### Event Content Type Structure
```typescript
interface ContentfulEvent {
  id: string;
  title: string;              // Event name
  description: string;        // Rich text content
  date: string;              // ISO date string
  location: string;          // Venue information
  price: number;             // Event cost in NOK
  stripePaymentLink: string; // Payment URL
  image?: string;            // Featured image URL
  category?: string;         // Event type
}
```

## 🎨 Design & UX Patterns

### Responsive Design
- **Mobile-first approach** with Tailwind breakpoints
- **Touch-friendly interface** with proper button sizing
- **Glassmorphism effects** for modern UI
- **Smooth animations** triggered by scroll

### Performance Optimizations
- **WebP image conversion** in `/public/optimized/`
- **Lazy loading** for images and components
- **Code splitting** with Vite
- **Service worker** for caching

### Error Handling Strategy
- **Graceful degradation**: Shows fallback events if Contentful fails
- **Loading states**: Full-screen spinner during initial load
- **User feedback**: Norwegian error messages
- **Retry mechanisms**: Automatic API retry on failure

## 🚀 Development Workflow

### Local Development
```bash
npm install          # Install dependencies
npm run dev         # Start dev server (usually port 3000/3001)
npm run build       # Production build
npm run preview     # Preview production build
```

### Deployment Process
1. **Git push** to main branch
2. **Netlify auto-build** triggered
3. **Environment variables** loaded from Netlify
4. **Production deployment** with CDN

## 🔧 Common Development Tasks

### Adding New Events
- **Method 1**: Add via Contentful web interface (recommended)
- **Method 2**: Update fallback events in `App.tsx` for emergencies

### Styling Changes
- **Tailwind classes** for most styling
- **Custom CSS** in `src/index.css` for animations
- **Responsive design** with mobile-first approach

### Performance Monitoring
- **Lighthouse audits** for performance metrics
- **Console monitoring** for errors
- **Network tab** for API call analysis

## 🐛 Known Issues & Solutions

### White Page Loading (SOLVED)
**Problem**: Blank screen during Contentful API calls
**Solution**: Added full-screen loading spinner and fallback events

### Mobile Navigation
**Implementation**: Hamburger menu with smooth transitions
**Touch targets**: Minimum 44px for accessibility

### Image Optimization
**Strategy**: WebP conversion with fallback to original formats
**Loading**: Intersection observer for lazy loading

## 🌐 Internationalization

### Language Support
- **Primary**: Norwegian (Bokmål)
- **UI Text**: Hardcoded Norwegian strings
- **Content**: Managed via Contentful
- **Error Messages**: Norwegian for better UX

## 🔐 Security & Best Practices

### API Security
- **Environment variables** for sensitive data
- **Read-only Contentful tokens**
- **Public Stripe keys** only
- **HTTPS enforcement** in production

### Code Quality
- **TypeScript strict mode** enabled
- **ESLint configuration** for code standards
- **Component-based architecture**
- **Custom hooks** for business logic

## 📱 Mobile-First Features

### Navigation
- **Hamburger menu** for mobile
- **Touch-friendly buttons**
- **Swipe gestures** support

### Performance
- **Optimized images** for different screen sizes
- **Minimal JavaScript** for faster loading
- **Progressive enhancement**

## 🔄 Data Flow

### Application Lifecycle
1. **App.tsx** initializes with loading state
2. **useEffect** triggers Contentful API call
3. **contentful.ts** fetches and transforms data
4. **State updates** trigger UI re-render
5. **Error handling** shows fallback if needed

### Event Booking Flow
1. **User browses** events on main page
2. **Clicks "Kjøp billett"** button
3. **Redirects to Stripe** payment page
4. **Completes payment** on Stripe
5. **Returns to site** (configured in Stripe)

## 📈 Analytics & Monitoring

### Performance Metrics
- **Core Web Vitals** optimization
- **Bundle size** monitoring
- **API response times**
- **Error rates** tracking

### User Experience
- **Loading time** optimization
- **Mobile usability** testing
- **Accessibility** compliance
- **Cross-browser** compatibility

## 🤖 AI Assistant Guidelines

When analyzing or modifying this codebase:

### ✅ DO:
- Check `App.tsx` for main application logic
- Understand Contentful integration patterns
- Respect TypeScript interfaces
- Test on mobile devices
- Maintain Norwegian language support
- Consider performance impact
- Ensure error handling

### ❌ DON'T:
- Break the Contentful integration
- Remove error handling or loading states
- Ignore mobile responsiveness
- Hardcode sensitive data
- Remove TypeScript types
- Break the payment flow

### 🔍 Key Areas to Focus On:
1. **User Experience**: Smooth loading and error handling
2. **Performance**: Image optimization and lazy loading
3. **Accessibility**: Proper ARIA labels and semantic HTML
4. **Mobile**: Touch-friendly interface
5. **Content Management**: Contentful integration reliability

---

**This project prioritizes user experience, performance, and maintainability. Always consider the Norwegian audience and mobile-first approach when making changes.**