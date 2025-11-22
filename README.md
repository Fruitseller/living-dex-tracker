# Living Pokédex Tracker

Ein visueller Tracker für eine Living Pokédex Collection in Pokémon Home. Verfolgen Sie Ihren Fortschritt beim Sammeln aller Pokémon von #1 bis #1025, organisiert in Boxen à 30 Pokémon - genau wie in Pokémon Home.

## Features

- **Box-Organisation**: 35 Boxen mit je 30 Pokémon, nummeriert von 1-1025
- **Visuelle Anzeige**: Farbige Sprites für gefangene Pokémon, ausgegraut für fehlende
- **Einfache Bedienung**: Ein Klick zum Togglen des Status (gefangen/fehlend)
- **Fortschrittsanzeige**:
  - Gesamtfortschritt mit Prozentbalken
  - Fortschritt pro Box
- **Persistierung**: Ihr Fortschritt wird automatisch im Browser gespeichert
- **Deutsche Namen**: Alle Pokémon werden mit deutschen Namen angezeigt
- **Responsive Design**: Funktioniert auf Desktop, Tablet und Smartphone

## Technologie

- **Framework**: SvelteKit mit TypeScript
- **Styling**: CSS Modules mit Scoped Styles
- **API**: PokéAPI v2 für Pokémon-Daten und Sprites
- **Deployment**: GitHub Pages mit Static Site Generation

## Installation & Entwicklung

### Voraussetzungen

- Node.js 20 oder höher
- npm

### Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/Fruitseller/living-dex-tracker.git
cd living-dex-tracker

# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Im Browser öffnen: http://localhost:5173
```

### Build für Produktion

```bash
# Statische Seite builden
npm run build

# Build lokal testen
npm run preview
```

## Nutzung

1. **Pokémon markieren**: Klicken Sie auf ein Pokémon-Sprite, um es als gefangen zu markieren
2. **Fortschritt verfolgen**: Sehen Sie Ihren Fortschritt pro Box und insgesamt im Header
3. **Automatische Speicherung**: Ihr Fortschritt wird automatisch im Browser gespeichert
4. **Navigation**: Scrollen Sie durch alle 35 Boxen

## Projektstruktur

```
living-dex-tracker/
├── src/
│   ├── lib/
│   │   ├── api/
│   │   │   └── pokeapi.ts          # PokéAPI Client
│   │   ├── components/
│   │   │   ├── Box.svelte          # Box-Komponente
│   │   │   ├── PokemonCard.svelte  # Pokémon-Card Komponente
│   │   │   └── ProgressHeader.svelte
│   │   ├── stores/
│   │   │   └── collection.ts       # State Management
│   │   └── types.ts                # TypeScript Definitionen
│   ├── routes/
│   │   ├── +layout.ts
│   │   └── +page.svelte            # Hauptseite
│   ├── app.css                     # Globale Styles
│   └── app.html                    # HTML Template
├── static/                         # Statische Assets
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions Workflow
├── svelte.config.js                # SvelteKit Konfiguration
├── vite.config.ts                  # Vite Konfiguration
└── package.json
```

## Deployment auf GitHub Pages

Das Projekt ist für GitHub Pages konfiguriert und wird automatisch deployed:

1. Repository Settings → Pages → Source: "GitHub Actions"
2. Push auf `main` Branch triggert automatisches Deployment
3. Nach dem Build ist die Seite verfügbar unter: `https://[username].github.io/living-dex-tracker`

## API & Datenquellen

- **PokéAPI v2**: Kostenlose API für Pokémon-Daten
- **Deutsche Namen**: Abgerufen aus `pokemon-species` Endpoint
- **Sprites**: Generation VIII Icons (fallback auf default sprites)
- **Caching**: Pokémon-Daten werden im LocalStorage gecached

## Browser-Kompatibilität

- Chrome/Edge (neueste 2 Versionen)
- Firefox (neueste 2 Versionen)
- Safari (neueste 2 Versionen)

## Performance

- **Initial Load**: Lädt alle 1025 Pokémon beim ersten Besuch (~30-60 Sekunden)
- **Caching**: Nachfolgende Besuche laden aus dem LocalStorage Cache
- **Optimierungen**:
  - Lazy Loading für Bilder
  - Batch-Requests an PokéAPI
  - Rate Limiting

## Bekannte Einschränkungen

- Keine Backend-Integration (rein client-seitig)
- Keine Multi-Device-Synchronisation
- Cache muss manuell geleert werden bei Browser-Datenlöschung

## Zukünftige Features (Optional)

- Export/Import der Collection als JSON
- Suchfunktion nach Pokémon-Name oder Nummer
- Filter nach gefangen/fehlend
- Shiny-Varianten
- Verschiedene Formen (Alola, Galar, etc.)
- Dark Mode
- PWA für Offline-Nutzung

## Lizenz

MIT License - Siehe LICENSE Datei

## Credits

- Pokémon-Daten von [PokéAPI](https://pokeapi.co)
- Pokémon und Pokémon-Namen sind Marken von Nintendo
- Erstellt mit [SvelteKit](https://kit.svelte.dev)

## Beitragen

Contributions sind willkommen! Bitte erstellen Sie einen Issue oder Pull Request.

---

**Viel Erfolg beim Vervollständigen Ihrer Living Pokédex! 🎮✨**
