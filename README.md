# Loqui Events - Social Events Platform

![Loqui Events](./public/Loqui%20events%20logo.jpg)

## About

Loqui Events is a modern, responsive website for a Norwegian social events company that organizes inclusive activities for adults looking to meet new people and make meaningful connections in Oslo.

## Features

- **Modern React/TypeScript Architecture**: Built with Vite for fast development and optimized builds
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive UI**: Smooth animations and modern glassmorphism effects
- **Multi-language Support**: Norwegian language interface
- **Event Management**: Showcase upcoming and past events
- **Contact Forms**: Netlify form integration for event booking requests
- **Social Media Integration**: Links to Instagram, TikTok, and Facebook
- **Payment Integration**: Support for Vipps, Visa, Mastercard, and Apple Pay

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React + Custom SVG icons
- **Fonts**: Google Fonts (Poppins)
- **Deployment**: Ready for Netlify deployment

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