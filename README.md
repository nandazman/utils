# Utils

Collection of simple utility tools running on a single Elysia server with Tailwind CSS.

## Features

### 🎬 YouTube Transcript Extractor (`/watch`)
- Extract transcripts from any YouTube video
- Display video title with click-to-copy URL
- Clickable timestamps that link to specific video moments
- Copy transcript only or copy all (title + transcript)
- URL auto-updates with video ID for easy sharing
- Auto-extract on page load from URL parameter

### 🔍 JSON Viewer & Comparator (`/json`)
- View and format JSON data
- Compare two JSON objects side-by-side
- Syntax highlighting

## Setup

```bash
# Install dependencies
bun install

# Development server with hot reload
bun run dev

# Build standalone binary
bun run build
```

Open **http://localhost:3333**

## Deployment

The project uses GitHub Actions for automatic deployment:

1. **Regular deployment**: Builds binary and deploys to server
2. **Rebuild deployment**: Add `(rebuild)` to commit message to update dependencies on server

```bash
# Regular commit
git commit -m "feat: add new feature"

# Rebuild with dependency updates
git commit -m "feat: update dependencies (rebuild)"
```

## Tech Stack

- **Runtime**: Bun v1.3+
- **Framework**: Elysia v1.4
- **Styling**: Tailwind CSS v4 (integrated with bun-plugin-tailwind)
- **API Libraries**: youtubei.js v16
- **Fonts**: Fredoka, Quicksand (Google Fonts)

## Project Structure

```
utils/
├── src/
│   └── index.ts           # Elysia server & API routes
├── public/
│   ├── index.html         # Home page
│   ├── watch/
│   │   └── index.html     # YouTube transcript tool
│   ├── json/
│   │   └── index.html     # JSON viewer tool
│   └── ...
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD pipeline
├── package.json
├── tsconfig.json
└── bunfig.toml
```

## API Endpoints

### POST `/api/youtube-transcript`
Extract transcript from YouTube video.

**Request:**
```json
{
  "url": "https://youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "success": true,
  "title": "Video Title",
  "segments": [
    {
      "text": "Transcript text",
      "startMs": "1000"
    }
  ]
}
```

## Development

The development server (`bun run dev`) runs with hot reload enabled, automatically restarting on TypeScript changes.

## Adding New Tools

1. Create a new directory in `public/` for your tool
2. Add HTML file with your tool's interface
3. Add API route in `src/index.ts` if needed
4. Add link to home page (`public/index.html`)
5. Update this README

## License

MIT
