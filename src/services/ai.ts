export interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
}

export interface SearchResult {
  title: string;
  url: string;
  description: string;
}

export interface GeneratedPage {
  title: string;
  content: string;
  navigation: Array<{ text: string; url: string }>;
}

export class AIService {
  private ollamaHost: string;
  private model: string;

  constructor() {
    this.ollamaHost = process.env.OLLAMA_HOST || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'qwen2.5-coder:14b';
  }

  async generateSearchResults(query: string): Promise<SearchResult[]> {
    const prompt = `Generate 8 realistic fake search results for the query: "${query}"

Return ONLY a valid JSON array with this exact format:
[
  {
    "title": "Company Name - Brief Description",
    "url": "www.company-name.com",
    "description": "A realistic 2-sentence description of what this fake company does. Make it sound like an early 2000s website."
  }
]

Make the companies feel authentic but entirely fictional. Include various business types (startups, established companies, services, etc.). Ensure URLs are simple domains without paths.`;

    try {
      const response = await this.callOllama(prompt);
      const parsed = this.parseJsonResponse(response);
      
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, 8); // Ensure max 8 results
      }
      
      // Fallback if AI response is invalid
      return this.getFallbackSearchResults(query);
    } catch (error) {
      console.error('Error generating search results:', error);
      return this.getFallbackSearchResults(query);
    }
  }

  async generatePage(domain: string, path: string = ''): Promise<GeneratedPage> {
    const fullPath = path ? `${domain}${path}` : domain;
    const prompt = `Generate realistic content for a fake website: ${fullPath}

Create content for ${path || 'homepage'} of ${domain}. 

Return ONLY valid JSON in this format:
{
  "title": "Page Title - Company Name",
  "content": "HTML content for the page body. Include 2-3 paragraphs of realistic content. Use basic HTML tags like <h2>, <p>, <ul>, <li>. Make it feel like an early 2000s business website.",
  "navigation": [
    {"text": "Home", "url": "${domain}"},
    {"text": "About Us", "url": "${domain}/about"},
    {"text": "Products", "url": "${domain}/products"},
    {"text": "Contact", "url": "${domain}/contact"}
  ]
}

Make the content professional but with that early web feel. Include company mission, services, or product information as appropriate.`;

    try {
      const response = await this.callOllama(prompt);
      const parsed = this.parseJsonResponse(response);
      
      if (parsed && parsed.title && parsed.content) {
        return parsed;
      }
      
      return this.getFallbackPage(domain, path);
    } catch (error) {
      console.error('Error generating page:', error);
      return this.getFallbackPage(domain, path);
    }
  }

  private async callOllama(prompt: string): Promise<string> {
    const response = await fetch(`${this.ollamaHost}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json() as OllamaResponse;
    return data.response;
  }

  private parseJsonResponse(response: string): any {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(response.trim());
    } catch {
      throw new Error('Invalid JSON response from AI');
    }
  }

  private getFallbackSearchResults(query: string): SearchResult[] {
    return [
      {
        title: "TechCorp Solutions - Innovative Business Software",
        url: "www.techcorp-solutions.com",
        description: "Leading provider of enterprise software solutions for growing businesses. Our cutting-edge platforms help streamline operations and boost productivity."
      },
      {
        title: "Digital Dynamics Inc - Web Development Services", 
        url: "www.digitaldynamics.net",
        description: "Professional web development and digital marketing agency. We create stunning websites and effective online marketing campaigns for businesses of all sizes."
      },
      {
        title: "StartupLaunch - Business Incubator Platform",
        url: "www.startuplaunch.org",
        description: "Helping entrepreneurs turn ideas into successful businesses. Our incubator program provides mentorship, funding, and resources for early-stage startups."
      }
    ];
  }

  private getFallbackPage(domain: string, path: string): GeneratedPage {
    const company = domain.split('.')[1] || 'Company';
    
    return {
      title: `${company.charAt(0).toUpperCase() + company.slice(1)} - Welcome`,
      content: `
        <h2>Welcome to ${company}</h2>
        <p>We are a leading company in our industry, providing innovative solutions for our customers since 1999. Our team of dedicated professionals is committed to delivering high-quality services and products.</p>
        <p>At ${company}, we believe in excellence, innovation, and customer satisfaction. Our mission is to help businesses grow and succeed in today's competitive marketplace.</p>
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Experienced team of professionals</li>
          <li>Cutting-edge technology solutions</li>
          <li>24/7 customer support</li>
          <li>Competitive pricing</li>
        </ul>
      `,
      navigation: [
        { text: "Home", url: domain },
        { text: "About Us", url: `${domain}/about` },
        { text: "Products", url: `${domain}/products` },
        { text: "Contact", url: `${domain}/contact` }
      ]
    };
  }
}