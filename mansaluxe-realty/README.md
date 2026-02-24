# MansaLuxeRealty - Luxury Real Estate Website

A premium real estate website for MansaLuxeRealty, a subsidiary of MrDGNGroup, showcasing Nigeria's most luxurious properties.

## 🏗️ Project Overview

This is a fully responsive, modern real estate website built with React, TypeScript, and Tailwind CSS. The site features a sophisticated black and gold design theme that reflects the luxury brand positioning.

## 🎨 Design System

- **Background**: Pure black (#000000) for elegance
- **Primary**: Gold (#D4AF37) for luxury accents
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body text
- **Layout**: Fully responsive using CSS Grid and Flexbox
- **Components**: Custom luxury-themed components with hover effects and animations

## 📁 Project Structure

```
src/
├── assets/             # Images and static assets
├── components/
│   ├── layout/        # Layout components (Navbar, Footer, Layout)
│   └── ui/            # Reusable UI components (shadcn/ui)
├── data/              # Static data files
│   └── properties.json # Property listings data
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Properties.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── NotFound.tsx
├── admin/             # Reserved for future admin panel
└── types/             # TypeScript type definitions
```

## 🚀 Features

### Public Website
- **Home**: Hero section with luxury mansion imagery, company statistics, featured properties
- **About**: Company story, mission/vision, team profiles, parent company information
- **Properties**: Filterable property grid with search functionality, detailed property cards
- **Services**: Comprehensive service offerings with process overview
- **Testimonials**: Client testimonials carousel with rating system
- **Contact**: Multi-location contact information with inquiry form

### Design Features
- Luxury-themed color scheme (black background, gold accents)
- Responsive design for all device sizes
- Smooth animations and hover effects
- Professional typography hierarchy
- Custom button variants and card designs

## 🛠️ Development

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd mansaluxerealty

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Replacing Placeholder Data

### Properties Data
Update `src/data/properties.json` with real property information:

```json
{
  "properties": [
    {
      "id": 1,
      "name": "Property Name",
      "location": "Location, City",
      "price": "₦XXX,XXX,XXX",
      "bedrooms": 4,
      "bathrooms": 5,
      "area": "320 sqm",
      "description": "Property description...",
      "image": "/path/to/image.jpg",
      "featured": true,
      "type": "penthouse"
    }
  ]
}
```

### Images
Replace placeholder images in `src/assets/`:
- `hero-mansion.jpg` - Main hero image
- `team-member-*.jpg` - Team member photos
- `office-interior.jpg` - Office photos

### Content Updates
Update the following files with real content:
- **Company Information**: `src/pages/About.tsx`
- **Services**: `src/pages/Services.tsx`
- **Testimonials**: `src/pages/Testimonials.tsx`
- **Contact Details**: `src/pages/Contact.tsx`
- **Footer Information**: `src/components/layout/Footer.tsx`

## 🎯 TODO Items for Production

### Content
- [ ] Replace all placeholder text with actual company information
- [ ] Add real property photos and data
- [ ] Update team member information and photos
- [ ] Verify contact information and office locations
- [ ] Add real client testimonials with permissions

### Features
- [ ] Integrate Google Maps for office locations
- [ ] Add property detail pages with image galleries
- [ ] Implement property search with filters
- [ ] Add newsletter subscription
- [ ] Integrate WhatsApp chat widget
- [ ] Add property comparison feature

### Technical
- [ ] Set up backend API for dynamic data
- [ ] Implement contact form submission
- [ ] Add property inquiry tracking
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Optimize images and implement lazy loading
- [ ] Add sitemap and SEO optimization
- [ ] Implement caching strategies

### Admin Panel (Future)
- [ ] Property management system
- [ ] Client relationship management
- [ ] Content management system
- [ ] Analytics dashboard
- [ ] User authentication
- [ ] File upload system

## 🔒 Admin Panel

The admin panel structure is prepared but not yet implemented. It will be located at `/admin` and include:
- Property CRUD operations
- Client management
- Analytics dashboard
- Content management
- User roles and permissions

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🎨 Customization

### Colors
Update colors in `src/index.css` and `tailwind.config.ts`:
```css
:root {
  --primary: 51 100% 52%;     /* Gold */
  --background: 0 0% 0%;      /* Black */
  /* ... other color variables */
}
```

### Typography
Fonts are loaded from Google Fonts. Update in `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:...');
```

### Components
All components use the design system. Create new variants in the component files or add utility classes in `src/index.css`.

## 🚀 Deployment

The site can be deployed to any static hosting service:

**Recommended platforms:**
- Vercel (recommended for React apps)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Build for production:**
```bash
npm run build
```

## 📞 Support

For development questions or customization needs, refer to the component documentation and TODO comments throughout the codebase.

## 📄 License

© 2024 MansaLuxeRealty - A MrDGNGroup Company. All rights reserved.