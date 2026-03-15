export function getContextNavigationScript(currentDomain: string): string {
  return `
    // Context-aware navigation script
    function navigateWithContext(url, isInternal = false) {
      // Extract domain/path from URL
      let domain, path;
      if (url.startsWith('/?p=')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const fullPath = urlParams.get('p');
        const parts = fullPath.split('/');
        domain = parts[0];
        path = parts.slice(1).join('/');
      } else if (url.startsWith('/?q=')) {
        // Handle search queries
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const query = urlParams.get('q');
        
        const context = {
          referrerDomain: '${currentDomain}',
          referrerPage: window.location.href,
          previousPages: JSON.parse(sessionStorage.getItem('visitedPages') || '[]')
        };
        
        fetch('/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, context })
        })
        .then(response => response.text())
        .then(html => {
          updatePage(html);
        })
        .catch(error => {
          console.error('Search error:', error);
          window.location.href = url;
        });
        return;
      } else {
        // Direct navigation fallback
        window.location.href = url;
        return;
      }
      
      // Build context for page requests
      const context = {
        referrerDomain: '${currentDomain}',
        referrerPage: window.location.href,
        templateType: document.body.className.includes('loading') ? undefined : getTemplateType(),
        previousPages: JSON.parse(sessionStorage.getItem('visitedPages') || '[]')
      };
      
      // Add current page to history
      if (isInternal) {
        const visitedPages = JSON.parse(sessionStorage.getItem('visitedPages') || '[]');
        visitedPages.push('${currentDomain}');
        if (visitedPages.length > 10) visitedPages.shift(); // Keep last 10 pages
        sessionStorage.setItem('visitedPages', JSON.stringify(visitedPages));
      }
      
      fetch('/page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, path, context })
      })
      .then(response => response.text())
      .then(html => {
        updatePage(html);
      })
      .catch(error => {
        console.error('Navigation error:', error);
        window.location.href = url;
      });
    }
    
    function updatePage(html) {
      // Update the page content
      document.open();
      document.write(html);
      document.close();
      
      // Update URL without page reload
      const newUrl = extractUrlFromHtml(html);
      if (newUrl) {
        history.pushState(null, '', newUrl);
      }
    }
    
    function extractUrlFromHtml(html) {
      // Try to extract the intended URL from the HTML title or meta tags
      const titleMatch = html.match(/<title>([^<]+)</title>/);
      if (titleMatch) {
        const title = titleMatch[1];
        // This is a simple approach - in a real app you'd have a better way to track URLs
        return window.location.pathname; // Keep current path for now
      }
      return null;
    }
    
    function getTemplateType() {
      // Try to determine template type from page structure
      if (document.querySelector('.company-name')) return 'corporate';
      if (document.querySelector('.site-title')) return 'personal';
      if (document.querySelector('.institution-name')) return 'academic';
      if (document.querySelector('.matrix-bg')) return 'startup';
      if (document.querySelector('.rainbow-text')) return 'geocities';
      return 'corporate'; // default
    }
    
    // Add context-aware navigation to all internal links
    document.addEventListener('DOMContentLoaded', function() {
      document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Skip external links and mailto links
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
          return;
        }
        
        // Handle internal navigation
        if (href.startsWith('/?')) {
          e.preventDefault();
          document.body.classList.add('loading');
          navigateWithContext(href, true);
        }
      });
    });
  `;
}