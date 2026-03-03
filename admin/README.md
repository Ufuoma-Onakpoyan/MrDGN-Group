# MR DGN Group Admin Panel

Unified admin panel for MR DGN Group websites: MansaLuxe Realty, Group site, Entertainment, and Construction.

## 🏛️ Overview

This admin panel manages content across all MR DGN Group sites:
- **MansaLuxe Realty**: Properties, Testimonials
- **MR DGN Group & Entertainment**: Blog, Portfolio
- **MR DGN Construction**: Products (with prices)

## ✨ Features

- **🔐 Authentication System**: Secure login/logout with route protection
- **📊 Dashboard**: Overview of content across all sites
- **🏠 Properties**: MansaLuxe Realty listings
- **💬 Testimonials**: Client reviews for realty
- **📦 Products**: Construction products with prices
- **📝 Blog**: Articles for Group & Entertainment sites
- **💼 Portfolio**: Projects for Group site
- **👥 Users**: Admin accounts and roles
- **⚙️ Settings**: Panel configuration
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Luxury Branding**: Elegant gold and black design with premium typography

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom luxury design system
- **UI Components**: Shadcn/ui component library
- **Routing**: React Router v6 with protected routes
- **State Management**: React Context API for authentication
- **Icons**: Lucide React icon library
- **Build Tool**: Vite for fast development and optimized builds
- **Fonts**: Playfair Display (serif headings) + Inter (sans-serif body)

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm, yarn, or bun package manager

### Installation & Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Access the application:**
   - Admin: `http://localhost:5174`
   - Admin login: `http://localhost:5174/admin/login`
   - Admin dashboard: `http://localhost:5174/admin/dashboard` (after authentication)

## 🔑 Admin Panel Access

### Admin Login
- Navigate to `/admin/login`
- **Email**: `admin@mrdgngroup.com`
- **Password**: `Admin123!`
- Requires backend running with seeded database

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/                 # Admin-specific components
│   │   ├── AdminLayout.tsx    # Main admin layout wrapper
│   │   ├── AdminNavbar.tsx    # Admin navigation header
│   │   ├── AdminFooter.tsx    # Admin footer component  
│   │   └── ProtectedRoute.tsx # Route authentication guard
│   └── ui/                    # Reusable UI components
├── contexts/
│   └── AuthContext.tsx        # Authentication context provider
├── lib/
│   └── admin-api.ts          # API layer with mock functions
├── pages/
│   └── admin/                # Admin page components
│       ├── Login.tsx         # Authentication page
│       ├── Dashboard.tsx     # Main dashboard
│       ├── Properties.tsx    # Property management
│       ├── Testimonials.tsx  # Testimonial management
│       ├── Users.tsx         # User management
│       └── Settings.tsx      # System settings
└── hooks/                    # Custom React hooks

public/
└── data/                     # Mock data files
    ├── properties.json       # Property listings data
    ├── testimonials.json     # Client testimonials data
    └── users.json           # Admin users data
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary: 45 100% 51%;        /* #D4AF37 - Luxury Gold */
--background: 0 0% 0%;         /* #000000 - Pure Black */
--foreground: 0 0% 100%;       /* #FFFFFF - Pure White */

/* Secondary Colors */
--card: 0 0% 5%;              /* Very Dark Gray */
--muted: 0 0% 15%;            /* Muted Dark */
--border: 0 0% 20%;           /* Dark Borders */
```

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Body Text**: Inter (clean sans-serif)

## 🔌 Backend Integration Guide

### Current Implementation
The admin panel currently uses:
- **Local JSON files** in `/public/data/` for mock data
- **Placeholder API functions** in `/src/lib/admin-api.ts`
- **localStorage** for mock authentication tokens

### Connecting to Real Backend

#### 1. Update API Configuration
```typescript
// In src/lib/admin-api.ts
class AdminAPI {
  private baseUrl = 'https://your-api-domain.com/api'; // Update this
  
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('admin_token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      ...options,
      headers,
    });
    
    return response.json();
  }
}
```

#### 2. Authentication Integration
Replace placeholder auth with real JWT authentication:

```typescript
async login(email: string, password: string) {
  const response = await fetch(`${this.baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  localStorage.setItem('admin_token', data.token);
  return data;
}
```

## 🚀 Deployment Guide

### Build for Production
```bash
npm run build
npm run preview  # Test production build locally
```

### Deployment Options
Deploy to any static hosting service:
- **Vercel**: `vercel --prod`
- **Netlify**: Connect Git repository
- **AWS S3 + CloudFront**: Upload dist/ folder

## 🛠️ Development Guidelines

### Adding New Admin Features

1. **Create page component** in `src/pages/admin/`
2. **Add route** in `src/App.tsx`
3. **Update navigation** in `src/components/admin/AdminNavbar.tsx`
4. **Implement API functions** in `src/lib/admin-api.ts`

## 📄 License

This project is developed for MansaLuxeRealty, a subsidiary of MR DGN Group. All rights reserved.

---

**Built with ❤️ for MansaLuxeRealty - Luxury Real Estate Excellence**