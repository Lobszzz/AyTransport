# Design Guidelines: Blank React Starter Project

## Design Approach

**Selected Approach:** Modern Design System (Material Design 3 inspired)
**Rationale:** For a blank starter project, we need a clean, professional foundation that's flexible and easy to extend. Material Design 3 provides excellent defaults for typography, spacing, and component patterns while remaining unopinionated enough for future customization.

## Core Design Elements

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Headings:** 
  - H1: 3xl (1.875rem), font-bold
  - H2: 2xl (1.5rem), font-semibold
  - H3: xl (1.25rem), font-semibold
- **Body:** Base size (1rem), font-normal
- **UI Elements:** sm (0.875rem), font-medium

### Layout System
**Spacing Units:** Use Tailwind's 4, 8, 12, 16, 24 units consistently
- Component padding: p-8, p-12
- Section spacing: py-16, py-24
- Element gaps: gap-4, gap-8
- Container: max-w-6xl mx-auto px-4

### Component Library

**Navigation**
- Clean horizontal header with centered or left-aligned logo
- Simple navigation links (Home, About, Contact as placeholders)
- Minimal height (h-16), subtle bottom border
- Sticky positioning for better UX

**Homepage/Landing**
- Hero Section: Clean, centered layout with max-w-4xl
  - Large heading introducing the project
  - Subtitle/description text
  - Primary CTA button
  - No background images (keeping it minimal for blank starter)
- Features Section: 2-column grid (md:grid-cols-2) with simple feature cards
  - Icon placeholder at top
  - Feature title
  - Brief description
- Footer: Simple, centered text with copyright/links

**Buttons**
- Primary: Solid background, rounded-lg, px-6 py-3
- Secondary: Border outline variant
- Hover states: Subtle scale or opacity shift

**Cards**
- Rounded corners (rounded-xl)
- Subtle shadow (shadow-md)
- Padding: p-6 or p-8
- Background: surface color

### Animations
**Minimal Use Only:**
- Smooth page transitions (fade-in)
- Button hover states (subtle scale: hover:scale-105)
- No scroll animations or complex effects

## Images
**Hero Section:** No large hero image - keep it clean and typography-focused for this blank starter
**Placeholder Icons:** Use Heroicons via CDN for any icon needs

## Project-Specific Guidelines

**Starter Content Strategy:**
- Homepage should feel like a blank canvas with clear structure
- Placeholder text should indicate where real content goes
- Components should demonstrate layout patterns without being opinionated
- Everything should be easily deletable/replaceable

**Responsive Breakpoints:**
- Mobile-first approach
- Stack all multi-column layouts on mobile
- md: breakpoint for 2-column grids
- lg: breakpoint for wider containers

**Accessibility:**
- Semantic HTML throughout
- Proper heading hierarchy
- Focus states on interactive elements
- ARIA labels where needed

This foundation provides a clean, professional starting point that can evolve in any direction based on future requirements.