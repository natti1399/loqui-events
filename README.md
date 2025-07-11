# Loqui Events - Event Management Platform

A modern, responsive event management platform built with React, TypeScript, and Vite. Features Contentful CMS integration for dynamic event management and Stripe payment processing.

## 🚀 Project Overview

**Loqui Events** is a Norwegian event management platform that allows users to browse and book events with integrated payment processing. The platform features a modern design with smooth animations, mobile responsiveness, and dynamic content management.

### Key Features
- 🎯 **Dynamic Event Management** via Contentful CMS
- 💳 **Stripe Payment Integration** for event bookings
- 📱 **Fully Responsive Design** with mobile-first approach
- ⚡ **Performance Optimized** with lazy loading and image optimization
- 🌐 **Multi-language Support** (Norwegian/English)
- 🎨 **Modern UI/UX** with Tailwind CSS and smooth animations
- 🔍 **SEO Optimized** with proper meta tags and sitemap

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **CMS**: Contentful
- **Payments**: Stripe
- **Deployment**: Netlify
- **Image Optimization**: Custom WebP conversion
- **State Management**: React Hooks

## Project Structure

```
loqui-events/
├── public/                 # Static assets
│   ├── images/            # Event photos and logos
│   └── payment-icons/     # Payment method icons
├── src/
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   ├── index.css         # Global styles and animations
│   └── vite-env.d.ts     # TypeScript declarations
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd loqui-events
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Components

### Header Navigation
- Responsive navigation with mobile menu
- Smooth scroll to sections
- Social media links
- Glassmorphism effects

### Hero Section
- Eye-catching gradient background
- Call-to-action buttons
- Statistics showcase
- Floating animation elements

### Events Section
- Upcoming events display
- Interactive event cards
- Hover effects and animations

### About Section
- Company story and mission
- Founder introduction
- Modern card layouts

### Contact Section
- Contact information cards
- Social media integration
- Business hours and location

### Event Booking Form
- Netlify form integration
- Responsive form design
- Input validation

## Customization

### Colors
The project uses a custom purple and pink color scheme defined in `tailwind.config.js`. You can modify the color palette by updating the theme configuration.

### Animations
Custom CSS animations are defined in `src/index.css`. The project includes:
- Fade-in animations
- Slide-down effects
- Floating elements
- Pulse glows

### Content
All content is in Norwegian and can be easily modified in the `App.tsx` file. Key sections include:
- Event descriptions
- Company information
- Contact details
- Social media links

## Deployment

### Netlify Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

3. Configure form handling in Netlify dashboard for the booking form

### Environment Variables

No environment variables are required for basic functionality. All configuration is handled through the source code.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Optimized images and assets
- Lazy loading for better performance
- Minimal bundle size with Vite
- Modern CSS with hardware acceleration
- Responsive images for different screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2025 Loqui AS. All rights reserved.

## Contact

For questions about this project:
- Email: sandrahodds@loquievents.com
- Phone: +47 45 11 76 51
- Instagram: [@loquievents](https://instagram.com/loquievents)
- TikTok: [@loqui.oslo](https://www.tiktok.com/@loqui.oslo)
- Facebook: [Loqui Event](https://www.facebook.com/loquievent)

---

**Built with ❤️ for the Oslo community**