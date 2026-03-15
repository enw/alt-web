export interface PageData {
  title: string;
  content: string;
  navigation: Array<{ text: string; url: string }>;
}

export function getPersonalTemplate(domain: string, path: string, pageData: PageData): string {
  const navHtml = pageData.navigation.map(nav => 
    `<a href="/?p=${encodeURIComponent(nav.url)}" class="nav-link">${escapeHtml(nav.text)}</a>`
  ).join(' &nbsp;&nbsp; ');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHtml(pageData.title)}</title>
      <meta charset="utf-8">
      <style>
        body {
          font-family: "Comic Sans MS", cursive, sans-serif;
          margin: 0;
          padding: 20px;
          background: linear-gradient(45deg, #ffccff 0%, #ccffff 50%, #ffffcc 100%);
          color: #333333;
        }
        body.loading {
          cursor: wait;
        }
        body.loading * {
          cursor: wait !important;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border: 3px ridge #ff6699;
          padding: 15px;
          border-radius: 15px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          padding: 15px;
          background: #ff99cc;
          border: 2px solid #ff6699;
          border-radius: 10px;
        }
        .site-title {
          font-size: 24px;
          font-weight: bold;
          color: #660033;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          margin: 0;
        }
        .welcome {
          font-size: 14px;
          color: #990066;
          margin: 5px 0 0 0;
          font-style: italic;
        }
        .navigation {
          background: #ccff99;
          border: 2px dashed #66cc00;
          padding: 10px;
          margin: 15px 0;
          text-align: center;
          border-radius: 8px;
        }
        .nav-link {
          color: #006600;
          text-decoration: none;
          font-weight: bold;
          font-size: 12px;
        }
        .nav-link:hover {
          color: #ff0066;
          text-decoration: underline;
        }
        .content {
          background: #ffffcc;
          border: 2px dotted #ffcc00;
          padding: 15px;
          margin: 15px 0;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
        }
        .content h2 {
          color: #cc6600;
          font-size: 16px;
          margin-top: 0;
          text-decoration: underline;
        }
        .content h3 {
          color: #009933;
          font-size: 14px;
        }
        .content p {
          margin-bottom: 10px;
        }
        .sidebar {
          background: #ffcccc;
          border: 2px solid #ff9999;
          padding: 10px;
          margin: 15px 0;
          border-radius: 8px;
          font-size: 11px;
        }
        .sidebar h3 {
          color: #990000;
          font-size: 13px;
          margin-top: 0;
          text-align: center;
        }
        .visitor-info {
          text-align: center;
          background: #e6e6ff;
          border: 1px solid #9999ff;
          padding: 8px;
          margin: 10px 0;
          border-radius: 5px;
          font-size: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 10px;
          color: #666666;
        }
        .guestbook-link {
          background: #99ff99;
          border: 2px outset #66cc66;
          padding: 5px 10px;
          display: inline-block;
          margin: 10px;
          color: #003300;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
        }
        .guestbook-link:hover {
          background: #66ff66;
          border: 2px inset #66cc66;
        }
        .marquee {
          background: #000000;
          color: #00ff00;
          padding: 5px;
          margin: 10px 0;
          font-family: monospace;
          font-size: 11px;
          border: 1px solid #333333;
        }
        .blink {
          animation: blink 1s linear infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="site-title">~*~ ${escapeHtml(getPersonalSiteName(domain))} ~*~</h1>
          <p class="welcome">Welcome to my corner of the web!</p>
        </div>
        
        <div class="navigation">
          ${navHtml}
        </div>
        
        <div class="content">
          ${pageData.content}
        </div>
        
        <div class="sidebar">
          <h3>★ Cool Links ★</h3>
          <p><a href="/?q=geocities">GeoCities Neighborhood</a><br>
          <a href="/?q=angelfire">Angelfire Sites</a><br>
          <a href="/?q=tripod">Tripod Community</a></p>
          
          <h3>☆ Web Rings ☆</h3>
          <p><a href="/?q=web+rings">Join the Ring!</a><br>
          <a href="/?q=random+site">[Random Site]</a><br>
          <a href="/?q=next+site">[Next Site]</a></p>
        </div>
        
        <div class="visitor-info">
          You are visitor #${Math.floor(Math.random() * 9999) + 100}<br>
          <span class="blink">★</span> Last updated: ${new Date().toLocaleDateString()} <span class="blink">★</span>
        </div>
        
        <div class="marquee">
          <marquee>*** Thanks for visiting! Please sign my guestbook! This site is best viewed with Netscape! ***</marquee>
        </div>
        
        <div style="text-align: center;">
          <a href="/?p=guestbook.html" class="guestbook-link">Sign My Guestbook!</a>
          <a href="/?q=email+me" class="guestbook-link">Email Me!</a>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ${escapeHtml(getPersonalSiteName(domain))}<br>
          Made with ♥ and lots of HTML!<br>
          <span style="font-size: 8px;">This page was hand-coded in Notepad</span></p>
        </div>
      </div>
      
      <script>
        // Add loading cursor when clicking navigation links
        document.querySelectorAll('.nav-link').forEach(function(link) {
          link.addEventListener('click', function() {
            document.body.classList.add('loading');
          });
        });
        
        // Add loading cursor when clicking sidebar and other links
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

function getPersonalSiteName(domain: string): string {
  const parts = domain.replace('www.', '').split('.');
  const name = parts[0];
  const variations = [
    `${name}'s Homepage`,
    `${name}'s World`,
    `${name}'s Corner`,
    `The ${name} Zone`,
    `${name}'s Place`,
  ];
  return variations[Math.floor(Math.random() * variations.length)];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}