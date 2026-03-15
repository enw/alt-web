export interface PageData {
  title: string;
  content: string;
  navigation: Array<{ text: string; url: string }>;
}

export function getStartupTemplate(domain: string, path: string, pageData: PageData): string {
  const navHtml = pageData.navigation.map(nav => 
    `<a href="/?p=${encodeURIComponent(nav.url)}" class="nav-link">${escapeHtml(nav.text)}</a>`
  ).join(' | ');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHtml(pageData.title)}</title>
      <meta charset="utf-8">
      <style>
        body {
          font-family: "Verdana", "Arial", sans-serif;
          margin: 0;
          padding: 0;
          background: #000000;
          color: #ffffff;
        }
        body.loading {
          cursor: wait;
        }
        body.loading * {
          cursor: wait !important;
        }
        .container {
          width: 780px;
          margin: 0 auto;
          background: linear-gradient(180deg, #001122 0%, #002244 50%, #001133 100%);
          border: 2px solid #00ffff;
          min-height: 100vh;
        }
        .header {
          background: linear-gradient(90deg, #ff6600 0%, #ff9900 50%, #ff6600 100%);
          color: #ffffff;
          padding: 20px;
          text-align: center;
          border-bottom: 3px solid #00ffff;
        }
        .company-name {
          font-size: 32px;
          font-weight: bold;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          letter-spacing: 2px;
        }
        .tagline {
          font-size: 14px;
          margin: 8px 0 0 0;
          color: #ffff99;
          font-style: italic;
        }
        .navigation {
          background: #003366;
          border-top: 1px solid #00ffff;
          border-bottom: 1px solid #00ffff;
          padding: 12px;
          text-align: center;
          font-size: 13px;
        }
        .nav-link {
          color: #00ffff;
          text-decoration: none;
          margin: 0 8px;
          padding: 4px 8px;
          border: 1px solid transparent;
        }
        .nav-link:hover {
          color: #ffff00;
          background-color: #004488;
          border: 1px solid #00ffff;
          text-decoration: underline;
        }
        .nav-link:visited {
          color: #99ccff;
        }
        .content {
          padding: 25px;
          font-size: 13px;
          line-height: 1.5;
        }
        .content h1 {
          color: #ff9900;
          font-size: 24px;
          margin: 0 0 20px 0;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        }
        .content h2 {
          color: #00ffff;
          font-size: 18px;
          margin: 25px 0 15px 0;
          border-left: 4px solid #ff6600;
          padding-left: 15px;
        }
        .content h3 {
          color: #ffff99;
          font-size: 16px;
          margin: 20px 0 10px 0;
        }
        .content p {
          margin-bottom: 15px;
          color: #cccccc;
        }
        .content ul {
          margin-left: 30px;
          color: #cccccc;
        }
        .content li {
          margin-bottom: 8px;
        }
        .content a {
          color: #00ffff;
          text-decoration: underline;
        }
        .content a:hover {
          color: #ffff00;
        }
        .sidebar {
          background: #002244;
          border: 2px solid #ff6600;
          margin: 20px;
          padding: 15px;
          border-radius: 10px;
        }
        .sidebar h3 {
          color: #ff9900;
          font-size: 16px;
          margin-top: 0;
          text-align: center;
        }
        .news-ticker {
          background: #ff6600;
          color: #ffffff;
          padding: 8px;
          margin: 20px;
          border: 1px solid #00ffff;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
        }
        .footer {
          background: #001122;
          border-top: 2px solid #00ffff;
          padding: 20px;
          text-align: center;
          font-size: 11px;
          color: #999999;
        }
        .footer a {
          color: #00ffff;
        }
        .contact-box {
          background: #003366;
          border: 2px dashed #00ffff;
          padding: 15px;
          margin: 20px;
          text-align: center;
          border-radius: 5px;
        }
        .contact-box h3 {
          color: #ffff00;
          margin-top: 0;
        }
        .blink {
          animation: blink 1s linear infinite;
        }
        .glow {
          text-shadow: 0 0 10px #00ffff;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .matrix-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="%23000011"/><text x="10" y="15" fill="%23003300" text-anchor="middle" font-family="monospace" font-size="10">0</text></svg>');
          opacity: 0.1;
          z-index: -1;
        }
      </style>
    </head>
    <body>
      <div class="matrix-bg"></div>
      <div class="container">
        <div class="header">
          <h1 class="company-name">${escapeHtml(getStartupName(domain))}</h1>
          <p class="tagline">The Future Is Now • Revolutionary Technology • Next Generation Solutions</p>
        </div>
        
        <div class="navigation">
          ${navHtml}
        </div>
        
        <div class="news-ticker">
          <span class="blink">★ NEW! ★</span> We've just secured Series A funding! 
          <span class="glow">Join the Revolution!</span> 
          <span class="blink">★ HOT! ★</span>
        </div>
        
        <div class="content">
          ${pageData.content}
        </div>
        
        <div class="sidebar">
          <h3>🚀 Innovation Zone 🚀</h3>
          <p style="color: #cccccc; font-size: 12px;">
            <span class="blink">•</span> <a href="/?q=venture+capital">VC Partners</a><br>
            <span class="blink">•</span> <a href="/?q=tech+news">Latest Tech News</a><br>
            <span class="blink">•</span> <a href="/?q=startup+incubator">Incubator Network</a><br>
            <span class="blink">•</span> <a href="/?q=angel+investors">Angel Investors</a><br>
            <span class="blink">•</span> <a href="/?q=ipo+tracker">IPO Tracker</a>
          </p>
        </div>
        
        <div class="contact-box">
          <h3 class="glow">Contact Our Visionaries</h3>
          <p style="color: #cccccc;">
            <strong>CEO:</strong> <a href="mailto:ceo@${domain}">ceo@${domain}</a><br>
            <strong>Investors:</strong> <a href="mailto:investors@${domain}">investors@${domain}</a><br>
            <strong>Press:</strong> <a href="mailto:press@${domain}">press@${domain}</a>
          </p>
          <p style="font-size: 10px; color: #999999;">
            📍 Silicon Valley • 🏢 Innovation Campus • 🌐 Global Reach
          </p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ${escapeHtml(getStartupName(domain))} - Disrupting the Future<br>
          <span style="color: #ff6600;">Optimized for Internet Explorer 5.5+ and Netscape 6.0+</span><br>
          <a href="/?p=privacy.html">Privacy</a> | 
          <a href="/?p=terms.html">Terms</a> | 
          <a href="/?p=careers.html">Careers</a> | 
          <a href="/?p=press.html">Press</a></p>
          
          <div style="margin-top: 10px; font-size: 9px;">
            <span class="blink">NASDAQ: ${getTickerSymbol(domain)}</span> | 
            Stock Price: $${(Math.random() * 100 + 10).toFixed(2)} 
            <span style="color: #00ff00;">▲ ${(Math.random() * 5).toFixed(2)}%</span>
          </div>
        </div>
      </div>
      
      <script>
        // Add loading cursor when clicking navigation links
        document.querySelectorAll('.nav-link').forEach(function(link) {
          link.addEventListener('click', function() {
            document.body.classList.add('loading');
          });
        });
        
        // Add loading cursor when clicking other links (except mailto)
        document.querySelectorAll('a').forEach(function(link) {
          if (!link.href.startsWith('mailto:')) {
            link.addEventListener('click', function() {
              document.body.classList.add('loading');
            });
          }
        });
      </script>
    </body>
    </html>
  `;
}

function getStartupName(domain: string): string {
  const parts = domain.replace('www.', '').split('.');
  const name = parts[0];
  const suffixes = ['.com', '.io', '.tech', '.ai', '.net'];
  const prefixes = ['i', 'e', 'cyber', 'web', 'net', 'digital', 'smart'];
  
  // Sometimes add tech suffixes to the name
  if (Math.random() < 0.3) {
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return name.charAt(0).toUpperCase() + name.slice(1) + suffix;
  }
  
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('');
}

function getTickerSymbol(domain: string): string {
  const parts = domain.replace('www.', '').split('.');
  const name = parts[0].replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase();
  return name + 'X'; // Add X to make it look more tech-y
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}