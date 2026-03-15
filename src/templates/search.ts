export function getSearchPage(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fake WWW - Search the Web</title>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: arial, sans-serif; 
          margin: 0; 
          padding: 20px; 
          background: #fff; 
        }
        body.loading {
          cursor: wait;
        }
        body.loading * {
          cursor: wait !important;
        }
        .container { 
          max-width: 600px; 
          margin: 100px auto; 
          text-align: center; 
        }
        .logo { 
          font-size: 36px; 
          color: #4285f4; 
          margin-bottom: 20px; 
          font-weight: bold;
        }
        .tagline {
          color: #70757a;
          font-size: 14px;
          margin-bottom: 30px;
        }
        .search-box { 
          width: 400px; 
          padding: 12px 16px; 
          font-size: 16px; 
          border: 1px solid #dfe1e5; 
          border-radius: 24px; 
          outline: none;
        }
        .search-box:focus {
          border-color: #4285f4;
          box-shadow: 0 1px 6px rgba(32,33,36,.28);
        }
        .search-btn { 
          padding: 10px 20px; 
          margin: 20px 8px 0 8px; 
          background: #f8f9fa; 
          border: 1px solid #f8f9fa; 
          border-radius: 4px; 
          color: #3c4043; 
          cursor: pointer;
          font-size: 14px;
        }
        .search-btn:hover { 
          border: 1px solid #dadce0;
          box-shadow: 0 1px 1px rgba(0,0,0,.1);
        }
        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #f2f2f2;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #70757a;
          border-top: 1px solid #dadce0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">Fake WWW</div>
        <div class="tagline">Explore the web that never was</div>
        <form method="GET" action="/">
          <input type="text" name="q" class="search-box" placeholder="Search the fake web..." autocomplete="off" autofocus>
          <br>
          <input type="submit" value="Fake Search" class="search-btn">
          <input type="submit" value="I'm Feeling Fake" class="search-btn" onclick="document.querySelector('input[name=q]').value='random tech startup'">
        </form>
      </div>
      
      <div class="footer">
        Fake WWW © 2003 - Bringing you the best of the web that never existed
      </div>
      
      <script>
        // Add loading cursor when form is submitted
        document.querySelector('form').addEventListener('submit', function() {
          document.body.classList.add('loading');
        });
        
        // Add loading cursor for "I'm Feeling Fake" button
        document.querySelector('input[value="I\\'m Feeling Fake"]').addEventListener('click', function() {
          document.body.classList.add('loading');
        });
      </script>
    </body>
    </html>
  `;
}

export function getSearchResultsPage(query: string, results: Array<{title: string, url: string, description: string}>): string {
  const resultsHtml = results.map(result => `
    <div class="result">
      <h3 class="result-title">
        <a href="/?p=${encodeURIComponent(result.url)}">${escapeHtml(result.title)}</a>
      </h3>
      <div class="result-url">${escapeHtml(result.url)}</div>
      <div class="result-description">${escapeHtml(result.description)}</div>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHtml(query)} - Fake WWW Search</title>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: arial, sans-serif; 
          margin: 0; 
          padding: 0; 
          background: #fff; 
        }
        body.loading {
          cursor: wait;
        }
        body.loading * {
          cursor: wait !important;
        }
        .header {
          padding: 6px 16px;
          border-bottom: 1px solid #ebebeb;
          background: #fff;
        }
        .header-content {
          display: flex;
          align-items: center;
          min-height: 44px;
        }
        .logo-small {
          color: #4285f4;
          font-size: 20px;
          font-weight: bold;
          margin-right: 24px;
          text-decoration: none;
        }
        .search-form {
          flex: 1;
          max-width: 584px;
        }
        .search-box-small {
          width: 100%;
          padding: 8px 12px;
          font-size: 16px;
          border: 1px solid #dfe1e5;
          border-radius: 24px;
          outline: none;
        }
        .search-box-small:focus {
          border-color: #4285f4;
        }
        .main {
          padding: 16px 16px 16px 180px;
          max-width: 650px;
        }
        .stats {
          color: #70757a;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .result {
          margin-bottom: 32px;
          max-width: 600px;
        }
        .result-title {
          margin: 0 0 4px 0;
        }
        .result-title a {
          color: #1a0dab;
          font-size: 20px;
          line-height: 26px;
          text-decoration: none;
        }
        .result-title a:hover {
          text-decoration: underline;
        }
        .result-title a:visited {
          color: #681da8;
        }
        .result-url {
          color: #006621;
          font-size: 14px;
          line-height: 18px;
          margin-bottom: 4px;
        }
        .result-description {
          color: #545454;
          font-size: 14px;
          line-height: 22px;
        }
        @media (max-width: 800px) {
          .main {
            padding-left: 16px;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="header-content">
          <a href="/" class="logo-small">Fake WWW</a>
          <form method="GET" action="/" class="search-form">
            <input type="text" name="q" value="${escapeHtml(query)}" class="search-box-small">
          </form>
        </div>
      </div>
      
      <div class="main">
        <div class="stats">About ${results.length} results (0.42 seconds)</div>
        ${resultsHtml}
      </div>
      
      <script>
        // Add loading cursor and context when search form is submitted
        document.querySelector('.search-form').addEventListener('submit', function(e) {
          e.preventDefault();
          document.body.classList.add('loading');
          
          const query = e.target.querySelector('input[name="q"]').value;
          
          // Send context via POST
          const context = {
            referrerDomain: window.location.hostname,
            referrerPage: window.location.href
          };
          
          fetch('/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: query,
              context: context
            })
          })
          .then(response => response.text())
          .then(html => {
            document.open();
            document.write(html);
            document.close();
          })
          .catch(error => {
            console.error('Error:', error);
            // Fallback to GET request
            window.location.href = '/?q=' + encodeURIComponent(query);
          });
        });
        
        // Add loading cursor and context when clicking on result links
        document.querySelectorAll('.result-title a').forEach(function(link) {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('loading');
            
            // Extract domain from the href
            const href = link.getAttribute('href');
            const urlParams = new URLSearchParams(href.split('?')[1]);
            const domain = urlParams.get('p');
            
            // Send context via POST
            const context = {
              searchQuery: '${escapeHtml(query)}',
              referrerDomain: window.location.hostname,
              referrerPage: window.location.href
            };
            
            fetch('/page', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                domain: domain,
                context: context
              })
            })
            .then(response => response.text())
            .then(html => {
              document.open();
              document.write(html);
              document.close();
            })
            .catch(error => {
              console.error('Error:', error);
              window.location.href = href; // Fallback to GET request
            });
          });
        });
        
        // Add loading cursor when clicking logo to go back
        document.querySelector('.logo-small').addEventListener('click', function() {
          document.body.classList.add('loading');
        });
      </script>
    </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}