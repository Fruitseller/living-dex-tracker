# Living Pokédex Tracker

A web application for tracking your Living Pokédex collection in Pokémon Home. Users can mark which Pokémon they have caught and track their progress across multiple boxes organized like Pokémon Home storage.

## Tech Stack

- **Framework**: SvelteKit 2.8+ with Svelte 5.2+
- **Language**: TypeScript 5.7+
- **Styling**: CSS with CSS Variables (no framework)
- **Build Tool**: Vite 5.4+
- **Adapter**: @sveltejs/adapter-static (for static site generation)
- **API**: PokéAPI (https://pokeapi.co) for Pokémon data and sprites
- **Package Manager**: npm

## Project Structure

```
src/
├── lib/
│   ├── api/
│   │   └── pokeapi.ts          # PokéAPI integration, fetches Pokémon data
│   ├── components/
│   │   ├── Box.svelte          # Box component displaying 30 Pokémon (6x5 grid)
│   │   ├── PokemonCard.svelte  # Individual Pokémon card with sprite and click interaction
│   │   └── ProgressHeader.svelte # Global progress tracking header
│   ├── stores/
│   │   └── collection.ts       # Svelte store for managing caught Pokémon (localStorage)
│   └── types.ts                # TypeScript type definitions
├── routes/
│   ├── +layout.ts              # SvelteKit layout configuration
│   └── +page.svelte            # Main page with boxes container
└── app.css                     # Global styles and CSS variables
```

## Architecture & Design Patterns

- **Svelte 5 Runes**: Uses `$state`, `$derived`, and `$props` for reactivity
- **Component-Based**: Small, focused components (Box, PokemonCard, ProgressHeader)
- **State Management**: Centralized collection store using Svelte stores
- **LocalStorage Persistence**: Collection data automatically saved to browser localStorage
- **Static Site Generation**: Pre-rendered for optimal performance
- **Mobile-First Design**: Responsive layout optimized for mobile and desktop

## Development Commands

```bash
npm run dev          # Start development server (default: http://localhost:5173)
npm run build        # Build for production (output: build/ directory)
npm run preview      # Preview production build
npm run check        # Run svelte-check for type checking
npm run check:watch  # Run svelte-check in watch mode
```

## Code Style & Guidelines

- **TypeScript**: Strict mode enabled, explicit typing preferred
- **Svelte 5 Syntax**: Use runes (`$state`, `$derived`, `$props`) instead of legacy syntax
- **ES Modules**: Use ES module imports/exports
- **CSS Variables**: Use CSS custom properties for theming (defined in app.css)
- **Naming Conventions**:
  - Components: PascalCase (e.g., `PokemonCard.svelte`)
  - Functions: camelCase (e.g., `fetchAllPokemon`)
  - Types/Interfaces: PascalCase (e.g., `BoxType`)

## Key Features

- **Box Organization**: Pokémon organized in boxes of 30 (6 columns × 5 rows), mimicking Pokémon Home
- **Click to Toggle**: Click/tap any Pokémon card to mark as caught/uncaught
- **Progress Tracking**:
  - Global progress in header
  - Per-box progress indicators
  - Visual feedback when box is complete
- **Persistent Storage**: Collection saved automatically to localStorage
- **Responsive Grid**: Adapts to screen size (mobile and desktop optimized)
- **Pokémon Home Sprites**: Uses official Pokémon Home sprites from PokéAPI

## Data Flow

1. **On Mount**: Fetch all Pokémon data from PokéAPI
2. **Generate Boxes**: Split Pokémon into boxes of 30
3. **Load Collection**: Restore caught Pokémon IDs from localStorage
4. **User Interaction**: Toggle caught state on click
5. **Auto-Save**: Persist changes to localStorage immediately

## Custom Keybindings

- **PageUp**: Navigate to previous box (centers box in viewport)
- **PageDown**: Navigate to next box (centers box in viewport)

## Repository Etiquette

- **Branch Naming**: `claude/feature-name-sessionid`
- **Commit Messages**: Concise, descriptive, in German (project language)
- **Git Operations**: Always develop on feature branches, never push to main directly
