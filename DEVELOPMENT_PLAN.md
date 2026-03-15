# Development Plan - Fake WWW

## MVP-First Approach

Building a minimal viable product first, then iteratively adding features.

## Phase 1: Core MVP (2-3 hours)

### 1.1 Basic Server Setup
- [x] README.md complete
- [ ] Initialize TypeScript project with Fastify
- [ ] Set up basic routing structure
- [ ] Configure Ollama integration
- [ ] Environment configuration

### 1.2 Minimal Search Interface
- [ ] Simple HTML search page (basic styling)
- [ ] Search form with single input field
- [ ] Basic GET route for search queries

### 1.3 Fake Search Results
- [ ] AI prompt for generating search results
- [ ] Return 5-10 fake websites as JSON
- [ ] Display results as simple links
- [ ] Basic caching (in-memory Map)

### 1.4 Basic Page Generation
- [ ] Route for `/?p=domain.com/path`
- [ ] AI prompt for generating website content
- [ ] Simple HTML template for generated pages
- [ ] Basic navigation within generated sites

**MVP Success Criteria:**
- Search for "tech startups" returns fake results
- Click result → view generated company page
- Generated page has 2-3 internal links
- Links navigate to other generated pages

## Phase 2: Enhanced Experience (3-4 hours)

### 2.1 Retro Styling
- [ ] Early 2000s Google-inspired CSS
- [ ] Table-based layouts for generated sites
- [ ] Classic web fonts and colors
- [ ] Basic animations and effects

### 2.2 Improved Content Generation
- [ ] Better AI prompts for realistic content
- [ ] Company profiles with multiple page types
- [ ] Contact information and team bios
- [ ] Product/service descriptions

### 2.3 Internal Linking System
- [ ] Cross-site references between generated companies
- [ ] Partner/vendor relationships
- [ ] Industry-specific linking patterns
- [ ] Breadcrumb navigation

### 2.4 Caching & Performance
- [ ] Persistent cache (file-based or Redis)
- [ ] Cache expiration strategies
- [ ] Response time optimization
- [ ] Memory usage monitoring

## Phase 3: Polish & Features (2-3 hours)

### 3.1 Advanced UI Elements
- [ ] Search suggestions/autocomplete
- [ ] Pagination for search results
- [ ] "I'm Feeling Lucky" button
- [ ] Site search within generated pages

### 3.2 Content Variety
- [ ] Different company types (startup, corporate, non-profit)
- [ ] Industry-specific content patterns
- [ ] Geographic information
- [ ] Founding dates and company history

### 3.3 Easter Eggs & Nostalgia
- [ ] "Under Construction" pages
- [ ] Visitor counters
- [ ] Animated GIF placeholders
- [ ] 404 pages with retro styling
- [ ] Web ring references

## Technical Architecture

### Core Components

```typescript
// src/app.ts - Main Fastify server
// src/routes/search.ts - Search functionality
// src/routes/pages.ts - Generated page serving
// src/services/ai.ts - Ollama integration
// src/services/cache.ts - Caching layer
// src/services/generator.ts - Content generation logic
// src/templates/ - HTML template functions
// src/static/ - CSS and retro assets
```

### Data Flow

1. **Search Request** → AI generates fake results → Cache → Return HTML
2. **Page Request** → Check cache → AI generates content → Cache → Return HTML
3. **Internal Links** → Extract domain/path → Route to page generator

### AI Prompting Strategy

```typescript
const searchPrompt = `Generate 8 fake search results for: "${query}"
Return as JSON array with: title, url, description
Make them feel like real early 2000s websites`;

const pagePrompt = `Generate website content for: ${domain}${path}
Include: title, content, navigation links to other pages
Style: Early web era company website`;
```

## File Structure

```
fake-www/
├── src/
│   ├── app.ts              # Fastify server setup
│   ├── routes/
│   │   ├── search.ts       # Search endpoint
│   │   └── pages.ts        # Page generation
│   ├── services/
│   │   ├── ai.ts          # Ollama client
│   │   ├── cache.ts       # Simple cache
│   │   └── generator.ts   # Content logic
│   ├── templates/
│   │   ├── search.ts      # Search page HTML
│   │   ├── results.ts     # Search results HTML
│   │   └── website.ts     # Generated site HTML
│   └── static/
│       ├── styles.css     # Retro CSS
│       └── assets/        # Images, fonts
├── .env                   # Configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Development Commands

```bash
# Setup
npm init -y
npm install fastify @fastify/static typescript @types/node tsx
npm install --save-dev @types/node nodemon

# Development
npm run dev     # Start with hot reload
npm run build   # Compile TypeScript
npm start      # Run production build

# Optional: Local Ollama setup
ollama pull qwen2.5-coder:14b
ollama serve
```

## Next Steps

1. **Start Phase 1**: Initialize project and basic server
2. **Test MVP**: Ensure search → results → pages flow works
3. **Iterate**: Add Phase 2 features based on initial testing
4. **Polish**: Phase 3 enhancements for authentic retro feel

## Questions for Implementation

1. Should we support multiple AI providers (Ollama + hosted fallback)?
2. How long should we cache generated content?
3. Any specific retro design elements you want prioritized?
4. Should generated sites link to real domains or stay within the fake web?