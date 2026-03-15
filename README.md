# Fake WWW - AI-Powered Vintage Search Engine

A nostalgic search engine that simulates the early web experience with AI-generated websites and search results.

## Overview

Fake WWW is a TypeScript web application that recreates the look and feel of early 2000s Google while generating entirely fictional websites and search results using AI. Each "website" is dynamically created with realistic content, internal navigation, and authentic retro styling.

## Concept

- **Vintage Search Interface**: Classic Google-inspired design from the early web era
- **AI-Generated Content**: Realistic websites created on-demand using AI
- **Dynamic Page Generation**: All pages generated based on URL parameters
- **Internal Navigation**: Fully functional site structures with interconnected pages
- **Realistic Search Results**: Contextually relevant fake search results
- **Retro Styling**: Authentic early web aesthetics and design patterns

## URL Structure

The application uses a simple parameter-based routing system:

```
http://localhost:3003/                          # Search homepage
http://localhost:3003/?q=search+terms           # Search results
http://localhost:3003/?p=www.example.com/       # Generated website homepage
http://localhost:3003/?p=www.example.com/about  # Generated about page
http://localhost:3003/?p=www.example.com/contact # Generated contact page
```

## Technology Stack

- **Framework**: Fastify (minimalist web framework)
- **Language**: TypeScript
- **AI Integration**: Ollama with qwen2.5-coder:14b (default) or OpenAI GPT models
- **Styling**: Vanilla CSS with retro design patterns
- **Template Engine**: Built-in HTML generation

## Features

- **Vintage Search Interface**: Classic Google-inspired design from the early web era
- **AI-Generated Content**: Realistic websites created on-demand using AI
- **Dynamic Page Generation**: All pages generated based on URL parameters
- **Internal Navigation**: Fully functional site structures with interconnected pages
- **Realistic Search Results**: Contextually relevant fake search results
- **Retro Styling**: Authentic early web aesthetics and design patterns

## Example Usage

1. **Search**: Visit the homepage and search for "tech startups"
2. **Browse Results**: Click on any search result to visit a generated website
3. **Navigate Sites**: Follow internal links within generated websites
4. **Explore**: Each site has realistic pages like About, Products, Contact, etc.

## Architecture

```
├── src/
│   ├── app.ts              # Main application entry
│   ├── routes/
│   │   ├── search.ts       # Search functionality
│   │   └── pages.ts        # Page generation
│   ├── services/
│   │   ├── ai.ts          # AI content generation
│   │   └── generator.ts   # Website structure generation
│   ├── templates/
│   │   ├── search.html    # Search page template
│   │   └── website.html   # Generated website template
│   └── static/
│       └── styles.css     # Retro styling
├── package.json
└── README.md
```

## Installation

```bash
pnpm install
```

## Configuration

Create a `.env` file with your AI service configuration. Choose either Ollama (local) or OpenAI (hosted):

### Option 1: Ollama (Default - Free, Local)
```env
# Ollama Configuration (default - local AI)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5-coder:14b
PORT=3003
```

### Option 2: OpenAI (Hosted - Requires API Key)
```env
# OpenAI Configuration (alternative - hosted AI)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
PORT=3003

# Optional: Use different OpenAI-compatible endpoint
# OPENAI_BASE_URL=https://api.openai.com/v1
```

The service automatically detects which provider to use based on whether `OPENAI_API_KEY` is set.

## Development

```bash
npm run dev
```

Visit `http://localhost:3003` to start exploring the fake web!

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run test` - Run tests

## Content Generation

The AI service generates:
- **Company Information**: Names, descriptions, mission statements
- **Page Content**: About pages, product descriptions, team bios
- **Navigation Structure**: Realistic site maps and internal linking
- **Contact Information**: Fake but realistic contact details
- **Visual Elements**: Descriptions for retro design elements

## Retro Design Elements

- Classic serif fonts (Times New Roman)
- Simple table-based layouts
- Minimal color palettes (blues, grays, basic web colors)
- Basic HTML styling reminiscent of early web design
- Animated GIFs placeholders and "Under Construction" banners
- Visitor counters and guestbooks

## Future Enhancements

- **Image Generation**: AI-generated retro website graphics
- **Sound Effects**: Classic dial-up and loading sounds
- **More Site Types**: Blogs, forums, personal homepages
- **Search History**: Persistent search and browsing history
- **Site Networks**: Interconnected fake websites with cross-links

## Contributing

This is a fun project exploring web nostalgia and AI content generation. Feel free to contribute ideas for making the fake web even more authentic!

## License

MIT License - Feel free to create your own version of the early web!
