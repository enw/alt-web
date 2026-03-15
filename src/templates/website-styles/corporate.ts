export interface PageData {
  title: string;
  content: string;
  navigation: Array<{ text: string; url: string }>;
}

export function getCorporateTemplate(domain: string, path: string, pageData: PageData): string {
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
          font-family: "Times New Roman", Times, serif;
          margin: 0;
          padding: 0;
          background: #ffffff;
          color: #000000;
        }
        body.loading {
          cursor: wait;
        }
        body.loading * {
          cursor: wait !important;
        }
        .container {
          width: 760px;
          margin: 0 auto;
          padding: 20px;
          background: #ffffff;
        }
        .header {
          background: #003366;
          color: #ffffff;
          padding: 20px;
          margin: -20px -20px 20px -20px;
          text-align: center;
        }
        .company-name {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .company-tagline {
          font-size: 12px;
          font-style: italic;
          opacity: 0.9;
        }
        .navigation {
          background: #f0f0f0;
          padding: 10px;
          margin-bottom: 20px;
          border: 2px inset #cccccc;
          text-align: center;
          font-size: 12px;
        }
        .nav-link {
          color: #0000ff;
          text-decoration: underline;
          margin: 0 5px;
        }
        .nav-link:hover {
          color: #ff0000;
        }
        .nav-link:visited {
          color: #800080;
        }
        .content {
          line-height: 1.4;
          font-size: 14px;
        }
        .content h2 {
          color: #003366;
          font-size: 18px;
          margin-top: 25px;
          margin-bottom: 10px;
          border-bottom: 2px solid #cccccc;
          padding-bottom: 5px;
        }
        .content h3 {
          color: #006600;
          font-size: 16px;
          margin-top: 20px;
          margin-bottom: 8px;
        }
        .content p {
          margin-bottom: 12px;
          text-align: justify;
        }
        .content ul {
          margin-left: 30px;
        }
        .content li {
          margin-bottom: 5px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #cccccc;
          text-align: center;
          font-size: 10px;
          color: #666666;
        }
        .counter {
          background: #000000;
          color: #00ff00;
          font-family: "Courier New", monospace;
          font-size: 10px;
          padding: 2px 5px;
          margin: 10px auto;
          width: 120px;
          text-align: center;
          border: 1px solid #333333;
        }
        .under-construction {
          background: #ffff00;
          color: #ff0000;
          font-weight: bold;
          text-align: center;
          padding: 5px;
          margin: 10px 0;
          border: 2px dashed #ff0000;
          font-size: 12px;
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
          <div class="company-name">${escapeHtml(getCompanyName(domain))}</div>
          <div class="company-tagline">Quality • Innovation • Excellence</div>
        </div>
        
        <div class="navigation">
          ${navHtml}
        </div>
        
        <div class="content">
          ${pageData.content}
        </div>
        
        <div class="counter">
          Visitors: ${Math.floor(Math.random() * 9999) + 1000}
        </div>
        
        <div class="footer">
          <p><strong>${escapeHtml(getCompanyName(domain))}</strong><br>
          Making the web a better place since ${1995 + Math.floor(Math.random() * 8)}<br>
          Best viewed in Netscape Navigator 4.0+ or Internet Explorer 5.0+</p>
          
          <div class="under-construction">
            <span class="blink">🚧</span> This site is under construction! Check back soon for updates! <span class="blink">🚧</span>
          </div>
          
          <p><a href="/?q=web+rings">Join our Web Ring!</a> | 
          <a href="/?p=guestbook.cgi">Sign our Guestbook</a> | 
          <a href="mailto:webmaster@${domain}">Email the Webmaster</a></p>
        </div>
      </div>
      
      <script>
        // Add loading cursor when clicking navigation links
        document.querySelectorAll('.nav-link').forEach(function(link) {
          link.addEventListener('click', function() {
            document.body.classList.add('loading');
          });
        });
        
        // Add loading cursor when clicking footer links (except mailto)
        document.querySelectorAll('.footer a').forEach(function(link) {
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

function getCompanyName(domain: string): string {
  const parts = domain.replace('www.', '').split('.');
  const name = parts[0];
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}