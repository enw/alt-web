import { getCorporateTemplate } from '../templates/website-styles/corporate';
import { getPersonalTemplate } from '../templates/website-styles/personal';
import { getAcademicTemplate } from '../templates/website-styles/academic';
import { getStartupTemplate } from '../templates/website-styles/startup';
import { getGeocitiesTemplate } from '../templates/website-styles/geocities';

export interface PageData {
  title: string;
  content: string;
  navigation: Array<{ text: string; url: string }>;
}

export interface WebsiteTemplate {
  name: string;
  template: (domain: string, path: string, pageData: PageData) => string;
  categories: string[];
  weight: number; // Higher weight = more likely to be selected
}

export class TemplateSelector {
  private templates: WebsiteTemplate[] = [
    {
      name: 'corporate',
      template: getCorporateTemplate,
      categories: ['business', 'corporate', 'professional', 'company', 'enterprise'],
      weight: 3
    },
    {
      name: 'personal',
      template: getPersonalTemplate,
      categories: ['personal', 'homepage', 'individual', 'blog', 'diary'],
      weight: 2
    },
    {
      name: 'academic',
      template: getAcademicTemplate,
      categories: ['academic', 'university', 'college', 'education', 'research', 'school'],
      weight: 2
    },
    {
      name: 'startup',
      template: getStartupTemplate,
      categories: ['startup', 'tech', 'innovation', 'venture', 'disrupt', 'revolutionary'],
      weight: 2
    },
    {
      name: 'geocities',
      template: getGeocitiesTemplate,
      categories: ['geocities', 'personal', 'fan', 'hobby', 'community', 'neighborhood'],
      weight: 1.5
    }
  ];

  private cache = new Map<string, string>();

  /**
   * Select a template based on domain and content hints
   */
  selectTemplate(domain: string, content?: string): WebsiteTemplate {
    const cacheKey = `${domain}-${content?.substring(0, 50) || ''}`;
    
    // Check if we've already selected a template for this domain
    const cachedTemplate = this.cache.get(cacheKey);
    if (cachedTemplate) {
      const template = this.templates.find(t => t.name === cachedTemplate);
      if (template) return template;
    }

    // Analyze domain and content to determine best template
    const scores = this.templates.map(template => ({
      template,
      score: this.calculateScore(template, domain, content)
    }));

    // Sort by score and add some randomness
    scores.sort((a, b) => b.score - a.score);
    
    // Weighted random selection from top templates
    const selectedTemplate = this.weightedRandomSelect(scores);
    
    // Cache the selection
    this.cache.set(cacheKey, selectedTemplate.name);
    
    return selectedTemplate;
  }

  /**
   * Calculate how well a template matches the domain/content
   */
  private calculateScore(template: WebsiteTemplate, domain: string, content?: string): number {
    let score = template.weight;
    
    // Check domain for category keywords
    const domainLower = domain.toLowerCase();
    for (const category of template.categories) {
      if (domainLower.includes(category)) {
        score += 5;
      }
    }

    // Check content for category keywords (if provided)
    if (content) {
      const contentLower = content.toLowerCase();
      for (const category of template.categories) {
        if (contentLower.includes(category)) {
          score += 2;
        }
      }
    }

    // Special domain patterns
    if (domainLower.includes('.edu') || domainLower.includes('university') || domainLower.includes('college')) {
      if (template.name === 'academic') score += 10;
    }
    
    if (domainLower.includes('.org') && template.name !== 'startup') {
      score += 3;
    }
    
    if (domainLower.includes('startup') || domainLower.includes('tech') || domainLower.includes('.io')) {
      if (template.name === 'startup') score += 8;
    }
    
    // GeoCities-style names (lots of numbers, personal names, etc.)
    if (/\d{2,}|hometown|mysite|personal|homepage/.test(domainLower)) {
      if (template.name === 'geocities') score += 6;
    }

    return score;
  }

  /**
   * Select template using weighted randomness from top scorers
   */
  private weightedRandomSelect(scores: Array<{template: WebsiteTemplate, score: number}>): WebsiteTemplate {
    // Take top 3 candidates or all if less than 3
    const candidates = scores.slice(0, Math.min(3, scores.length));
    
    // If there's a clear winner (score difference > 5), use it most of the time
    if (candidates.length > 1 && candidates[0].score - candidates[1].score > 5) {
      return Math.random() < 0.8 ? candidates[0].template : candidates[1].template;
    }
    
    // Otherwise, weighted random selection
    const totalWeight = candidates.reduce((sum, candidate) => sum + candidate.score, 0);
    let random = Math.random() * totalWeight;
    
    for (const candidate of candidates) {
      random -= candidate.score;
      if (random <= 0) {
        return candidate.template;
      }
    }
    
    // Fallback
    return candidates[0].template;
  }

  /**
   * Get all available template names
   */
  getAvailableTemplates(): string[] {
    return this.templates.map(t => t.name);
  }

  /**
   * Force a specific template (for testing)
   */
  getTemplate(name: string): WebsiteTemplate | null {
    return this.templates.find(t => t.name === name) || null;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}