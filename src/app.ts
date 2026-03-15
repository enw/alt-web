import fastify from 'fastify';
import path from 'path';
import { config } from 'dotenv';

// Load environment variables
config();

const server = fastify({ 
  logger: true 
});

// Register static file serving
server.register(require('@fastify/static'), {
  root: path.join(__dirname, 'static'),
  prefix: '/static/',
});

// Health check endpoint
server.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
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

// Placeholder functions - will implement these next
async function generatePage(path: string): Promise<string> {
  return `<h1>Generated Page: ${path}</h1><p>Coming soon...</p>`;
}

async function generateSearchResults(query: string): Promise<string> {
  return `<h1>Search Results for: ${query}</h1><p>Coming soon...</p>`;
}

function getSearchPage(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fake WWW - Search the Web</title>
      <style>
        body { font-family: arial, sans-serif; margin: 0; padding: 20px; background: #fff; }
        .container { max-width: 600px; margin: 100px auto; text-align: center; }
        .logo { font-size: 36px; color: #4285f4; margin-bottom: 20px; }
        .search-box { width: 400px; padding: 10px; font-size: 16px; border: 2px solid #dfe1e5; border-radius: 24px; }
        .search-btn { padding: 10px 20px; margin: 20px 5px; background: #f8f9fa; border: 1px solid #f8f9fa; border-radius: 4px; color: #3c4043; cursor: pointer; }
        .search-btn:hover { border: 1px solid #dadce0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">Fake WWW</div>
        <form method="GET">
          <input type="text" name="q" class="search-box" placeholder="Search the fake web..." autocomplete="off">
          <br>
          <input type="submit" value="Fake Search" class="search-btn">
          <button type="button" class="search-btn">I'm Feeling Fake</button>
        </form>
      </div>
    </body>
    </html>
  `;
}

// Start the server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3003');
    await server.listen({ port, host: '0.0.0.0' });
    console.log(\`🚀 Fake WWW server running at http://localhost:\${port}\`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();