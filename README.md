# Utils

Collection of simple utility tools running on a single Elysia server with Tailwind CSS.

## Setup

```bash
# Install dependencies
bun install

# Build CSS (first time)
bun run build:css

# Run dev server (runs both CSS watcher + server)
bun run dev
```

Open **http://localhost:3000**

## Development

The `bun run dev` command runs **two watchers**:
- **CSS Watcher**: Watches HTML changes and rebuilds Tailwind CSS → `public/dist/output.css`
- **Server Watcher**: Watches TypeScript changes and restarts Elysia server

## Tools

- **YouTube Script Extractor** (`/youtube-script`) - Extract transcripts from YouTube videos
- **JSON Viewer** (coming soon)

## Tech Stack

- **Runtime**: Bun
- **Framework**: Elysia
- **Styling**: Tailwind CSS v3 (built, not CDN)
- **Libraries**: youtube-transcript

## Project Structure

```
utils/
├── index.ts              # Elysia server
├── package.json
├── tailwind.config.js    # Tailwind configuration
├── src/
│   └── input.css         # Tailwind source
└── public/
    ├── dist/
    │   └── output.css    # Generated CSS (served to browser)
    ├── index.html        # Home page
    └── youtube-script.html
```

## Adding New Tools

1. Add a new route in `index.ts`
2. Create HTML file in `public/`
3. Add link to home page (`public/index.html`)
