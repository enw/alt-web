import fastify from 'fastify';
import path from 'path';
import { config } from 'dotenv';
import { AIService, SearchResult, GeneratedPage } from './services/ai';
import { SimpleCache } from './services/cache';
import { getSearchPage, getSearchResultsPage } from './templates/search';
import { getWebsitePage, PageData } from './templates/website';

// Load environment variables
config();

const server = fastify({ 
  logger: true 
});

// Initialize services
const aiService = new AIService();
const cache = new SimpleCache(60); // 1 hour TTL

// Register static file serving
server.register(require('@fastify/static'), {
  root: path.join(__dirname, 'static'),
  prefix: '/static/',
});

// Health check endpoint
server.get('/health', async (request, reply) => {
  const cacheStats = cache.getStats();
  return { 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    cache: cacheStats
  };
});

// Main search page
server.get('/', async (request, reply) => {
  const { q, p } = request.query as { q?: string; p?: string };
  
  if (p) {
    // Handle generated page request
    const pageContent = await generatePage(p);
    reply.type('text/html').send(pageContent);
  } else if (q) {
    // Handle search query
    const searchResults = await generateSearchResults(q);
    reply.type('text/html').send(searchResults);
  } else {
    // Show search homepage
    const searchPage = getSearchPage();
    reply.type('text/html').send(searchPage);
  }
});

// Cache cleanup endpoint (for debugging)
server.get('/admin/cache/cleanup', async (request, reply) => {
  const deletedCount = cache.cleanup();
  return { deletedEntries: deletedCount, timestamp: new Date().toISOString() };
});

async function generateSearchResults(query: string): Promise<string> {
  const cacheKey = SimpleCache.searchKey(query);
  
  // Check cache first
  let results = cache.get<SearchResult[]>(cacheKey);
  
  if (!results) {
    console.log(`Generating search results for: ${query}`);
    results = await aiService.generateSearchResults(query);
    cache.set(cacheKey, results, 30); // Cache for 30 minutes
  } else {
    console.log(`Using cached search results for: ${query}`);
  }
  
  return getSearchResultsPage(query, results);
}

async function generatePage(pagePath: string): Promise<string> {
  // Parse domain and path from the page parameter
  const parts = pagePath.split('/');
  const domain = parts[0];
  const path = parts.slice(1).join('/');
  
  const cacheKey = SimpleCache.pageKey(domain, path);
  
  // Check cache first
  let pageData = cache.get<PageData>(cacheKey);
  
  if (!pageData) {
    console.log(`Generating page: ${pagePath}`);
    const generatedPage = await aiService.generatePage(domain, path);
    // Convert GeneratedPage to PageData format
    pageData = {
      title: generatedPage.title,
      content: generatedPage.content,
      navigation: generatedPage.navigation
    };
    cache.set(cacheKey, pageData, 60); // Cache for 1 hour
  } else {
    console.log(`Using cached page: ${pagePath}`);
  }
  
  return getWebsitePage(domain, path, pageData);
}

// Start the server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3003');
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Fake WWW server running at http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();