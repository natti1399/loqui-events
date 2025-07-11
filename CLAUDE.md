# Claude Code Project Analysis Guide

## 🎯 Project Overview for AI Assistant

**Loqui Events** is a Norwegian event management platform with Contentful CMS integration and Stripe payments. This guide helps AI assistants understand the codebase structure and key patterns.

## 🏗 Architecture Overview

### Core Technologies
- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Contentful CMS** for dynamic content management
- **Stripe** for payment processing
- **Netlify** for deployment and hosting

### Key Design Patterns
1. **Component-based Architecture**: Reusable UI components
2. **Custom Hooks**: Business logic separation
3. **Service Layer**: External API abstractions
4. **Type-safe Development**: Comprehensive TypeScript usage
5. **Performance Optimization**: Lazy loading and image optimization

## 📁 Critical Files to Understand

### 1. `/src/App.tsx` (Main Application)
**Purpose**: Root component handling all major functionality
**Key Responsibilities**:
- Event data fetching from Contentful
- Loading states and error handling
- Navigation and routing logic
- Hero section with animations
- Event listing and contact form

**Important Patterns**:
```typescript
// Loading state management
const [loading, setLoading] = useState(true);
const [events, setEvents] = useState<ContentfulEvent[]>([]);
const [error, setError] = useState<string | null>(null);

// Error handling with fallback content
if (error) {
  // Shows fallback events instead of breaking
}
```

### 2. `/src/services/contentful.ts` (CMS Integration)
**Purpose**: Contentful API service layer
**Key Functions**:
- `getEvents()`: Fetches all published events
- `getEvent(id)`: Fetches single event by ID
- Error handling and data transformation

**Content Model**:
```typescript
interface ContentfulEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  stripePaymentLink: string;
  image?: string;
  category?: string;
}
```

### 3. `/src/components/` (Reusable Components)
- **AnimatedSection.tsx**: Intersection observer animations
- **LazyImage.tsx**: Optimized image loading with WebP support
- **PaymentIcons.tsx**: Payment method display
- **SocialIcons.tsx**: Social media links

### 4. `/src/hooks/` (Custom Hooks)
- **useEvents.ts**: Event data state management
- **useIntersectionObserver.ts**: Scroll-based animations

## 🔧 Environment Configuration

### Required Environment Variables
```env
# Contentful CMS
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
```

## 🎨 Styling Patterns

### Tailwind CSS Usage
- **Responsive Design**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- **Custom Colors**: Brand colors defined in `tailwind.config.js`
- **Animations**: Custom keyframes for smooth transitions
- **Glassmorphism**: `backdrop-blur` effects for modern UI

### Key CSS Classes
```css
/* Glassmorphism effect */
.glass-effect {
  @apply backdrop-blur-md bg-white/10 border border-white/20;
}

/* Gradient backgrounds */
.gradient-bg {
  @apply bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600;
}
```

## 🔄 Data Flow

### Event Loading Process
1. **App.tsx** initializes with loading state
2. **useEffect** triggers Contentful API call
3. **contentful.ts** service fetches and transforms data
4. **Events state** updates trigger UI re-render
5. **Error handling** shows fallback content if API fails

### Error Handling Strategy
- **Graceful Degradation**: Show fallback events if Contentful fails
- **Loading States**: Full-screen spinner during initial load
- **User Feedback**: Norwegian error messages for better UX

## 🚀 Performance Optimizations

### Image Optimization
- **WebP Conversion**: Automatic format conversion in `/public/optimized/`
- **Lazy Loading**: Images load on scroll with intersection observer
- **Responsive Images**: Multiple sizes for different screen densities

### Code Splitting
- **Vite Optimization**: Automatic chunk splitting
- **Dynamic Imports**: Components loaded on demand
- **Tree Shaking**: Unused code elimination

## 🐛 Common Issues & Solutions

### 1. White Page Loading
**Problem**: Contentful API delays cause blank screen
**Solution**: Implemented full-screen loading spinner and fallback events

### 2. Image Loading Issues
**Problem**: Large images slow down page load
**Solution**: WebP optimization and lazy loading implementation

### 3. Mobile Responsiveness
**Problem**: Desktop-first design breaks on mobile
**Solution**: Mobile-first Tailwind approach with proper breakpoints

## 🔍 Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled, comprehensive type definitions
- **Component Structure**: Props interfaces, proper error boundaries
- **Naming Conventions**: PascalCase for components, camelCase for functions
- **File Organization**: Feature-based folder structure

### Testing Approach
- **Manual Testing**: Multi-device testing required
- **Performance**: Lighthouse audits for optimization
- **Accessibility**: ARIA labels and semantic HTML

### Git Workflow
- **Main Branch**: Auto-deploys to Netlify
- **Commit Messages**: Descriptive, feature-focused
- **Environment**: Separate staging/production configs

## 📱 Mobile-First Considerations

### Responsive Breakpoints
```css
/* Tailwind breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Touch Interactions
- **Button Sizing**: Minimum 44px touch targets
- **Gesture Support**: Swipe navigation for events
- **Viewport**: Proper meta viewport configuration

## 🌐 Internationalization

### Language Support
- **Primary**: Norwegian (Bokmål)
- **Fallback**: English for technical terms
- **Content**: Managed through Contentful CMS
- **UI Text**: Hardcoded Norwegian strings in components

## 🔐 Security Considerations

### API Keys
- **Environment Variables**: Never commit sensitive data
- **Contentful**: Read-only access tokens
- **Stripe**: Public keys only in frontend

### Content Security
- **Sanitization**: Rich text content from Contentful
- **Validation**: Form input validation
- **HTTPS**: Enforced in production

## 📊 Analytics & Monitoring

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS optimization
- **Bundle Size**: Monitored via Vite build analysis
- **Load Times**: Tracked for different content types

### Error Tracking
- **Console Errors**: Monitored in production
- **API Failures**: Logged for debugging
- **User Experience**: Fallback content ensures functionality

## 🚀 Deployment Pipeline

### Netlify Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**: Set in Netlify dashboard
- **Redirects**: Configured in `/public/_redirects`

### CI/CD Process
1. **Git Push**: Triggers Netlify build
2. **Build Process**: Vite optimization
3. **Deployment**: Automatic to production
4. **Cache Invalidation**: CDN cache refresh

---

## 🤖 AI Assistant Guidelines

When working with this codebase:

1. **Always check** `/src/App.tsx` for main application logic
2. **Understand** the Contentful integration in `/src/services/contentful.ts`
3. **Respect** the TypeScript interfaces in `/src/types/`
4. **Follow** the component patterns in `/src/components/`
5. **Test** changes on multiple screen sizes
6. **Maintain** Norwegian language support
7. **Consider** performance impact of changes
8. **Ensure** error handling for API failures

This codebase prioritizes user experience, performance, and maintainability. Always consider the end-user impact of any modifications.