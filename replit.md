# React JavaScript Starter Project

A clean, minimal React JavaScript starter template with a professional design system and modern development setup.

## Project Overview

This is a blank React starter project that provides a solid foundation for building web applications. It comes pre-configured with:

- **React 18** with modern hooks and patterns
- **TypeScript** for type-safe development
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library for beautiful, accessible UI components
- **Wouter** for lightweight client-side routing
- **TanStack Query** for data fetching and state management
- **Express.js** backend server

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/ui/    # shadcn/ui components
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utilities and configuration
│   │   ├── App.tsx           # Main app component with routing
│   │   └── index.css         # Global styles and design tokens
│   └── index.html            # HTML entry point
├── server/
│   ├── routes.ts             # API route definitions
│   └── storage.ts            # In-memory data storage
├── shared/
│   └── schema.ts             # Shared types and schemas
└── design_guidelines.md      # Design system documentation
```

## Getting Started

The application is already configured and ready to run. The workflow "Start application" runs `npm run dev` which starts both the frontend and backend servers.

### Adding New Pages

1. Create a new component in `client/src/pages/`
2. Register the route in `client/src/App.tsx`
3. Add navigation links in your components

### Customizing the Design

- Edit `client/index.html` to change the page title and meta tags
- Modify `tailwind.config.ts` to customize colors, fonts, and other design tokens
- The `design_guidelines.md` file contains guidance on the design system

### Adding Backend API Routes

1. Define your data models in `shared/schema.ts`
2. Add storage methods to the `IStorage` interface in `server/storage.ts`
3. Implement the storage methods in the `MemStorage` class
4. Create API endpoints in `server/routes.ts` (prefix all routes with `/api`)

## Design System

The project uses a clean, modern design system with:

- **Typography**: Inter font family
- **Colors**: Professional blue primary color with neutral grays
- **Components**: Pre-built shadcn/ui components
- **Spacing**: Consistent spacing scale using Tailwind
- **Responsive**: Mobile-first responsive design

## Recent Changes

- Initial project setup with blank React starter
- Clean homepage with hero section and feature cards
- Professional navigation header
- Responsive layout with Tailwind CSS
- shadcn/ui component library integration
