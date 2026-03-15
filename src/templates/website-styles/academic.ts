export interface PageData {
  title: string;
  content: string;
  navigation: Array<{ text: string; url: string }>;
}

export function getAcademicTemplate(domain: string, path: string, pageData: PageData): string {
  const navHtml = pageData.navigation.map(nav => 
    `<a href="/?p=${encodeURIComponent(nav.url)}" class="nav-link">${escapeHtml(nav.text)}</a>`
  ).join(' • ');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHtml(pageData.title)}</title>
      <meta charset="utf-8">
      <style>
        body {
          font-family: "Garamond", "Georgia", "Times New Roman", serif;
          margin: 0;
          padding: 0;
          background: #f8f8f0;
          color: #2c2c2c;
          line-height: 1.6;
        }
        body.loading {
          cursor: wait;
        }
        body.loading * {
          cursor: wait !important;
        }
        .container {
          width: 700px;
          margin: 0 auto;
          padding: 20px;
          background: #ffffff;
          border-left: 1px solid #cccccc;
          border-right: 1px solid #cccccc;
          min-height: 100vh;
          box-sizing: border-box;
        }
        .header {
          border-bottom: 3px double #8b4513;
          margin-bottom: 25px;
          padding-bottom: 20px;
          text-align: center;
        }
        .institution-name {
          font-size: 28px;
          color: #8b4513;
          font-weight: bold;
          margin: 0;
          letter-spacing: 1px;
        }
        .department {
          font-size: 16px;
          color: #654321;
          font-style: italic;
          margin: 5px 0 0 0;
        }
        .navigation {
          background: #e6e6dc;
          border: 1px solid #cccccc;
          padding: 12px;
          margin-bottom: 25px;
          text-align: center;
          font-size: 13px;
        }
        .nav-link {
          color: #8b4513;
          text-decoration: underline;
          margin: 0 3px;
        }
        .nav-link:hover {
          color: #654321;
          background-color: #f0f0e8;
        }
        .nav-link:visited {
          color: #5d4037;
        }
        .content {
          font-size: 14px;
          margin-bottom: 30px;
        }
        .content h1 {
          color: #8b4513;
          font-size: 22px;
          margin: 30px 0 15px 0;
          border-bottom: 1px solid #cccccc;
          padding-bottom: 5px;
        }
        .content h2 {
          color: #654321;
          font-size: 18px;
          margin: 25px 0 12px 0;
        }
        .content h3 {
          color: #5d4037;
          font-size: 16px;
          margin: 20px 0 10px 0;
          font-style: italic;
        }
        .content p {
          margin-bottom: 15px;
          text-align: justify;
        }
        .content ul, .content ol {
          margin-left: 40px;
          margin-bottom: 15px;
        }
        .content li {
          margin-bottom: 8px;
        }
        .content blockquote {
          margin: 20px 40px;
          padding: 10px 20px;
          background: #f8f8f0;
          border-left: 4px solid #8b4513;
          font-style: italic;
        }
        .sidebar {
          background: #f0f0e8;
          border: 1px solid #d0d0d0;
          padding: 15px;
          margin: 20px 0;
          font-size: 12px;
        }
        .sidebar h3 {
          color: #8b4513;
          font-size: 14px;
          margin-top: 0;
          border-bottom: 1px dotted #cccccc;
          padding-bottom: 5px;
        }
        .contact-info {
          background: #ffffff;
          border: 1px solid #cccccc;
          padding: 15px;
          margin: 20px 0;
          font-size: 13px;
        }
        .footer {
          border-top: 1px solid #cccccc;
          padding-top: 15px;
          margin-top: 30px;
          text-align: center;
          font-size: 11px;
          color: #666666;
        }
        .last-updated {
          text-align: right;
          font-size: 10px;
          color: #999999;
          font-style: italic;
          margin: 10px 0;
        }
        .publication-list {
          font-size: 13px;
        }
        .publication-list li {
          margin-bottom: 10px;
          border-left: 2px solid #e0e0e0;
          padding-left: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="institution-name">${escapeHtml(getInstitutionName(domain))}</h1>
          <p class="department">Department of ${escapeHtml(getDepartment())}</p>
        </div>
        
        <div class="navigation">
          ${navHtml}
        </div>
        
        <div class="content">
          ${pageData.content}
        </div>
        
        <div class="sidebar">
          <h3>Quick Links</h3>
          <p>
            <a href="/?q=academic+calendar">Academic Calendar</a><br>
            <a href="/?q=course+catalog">Course Catalog</a><br>
            <a href="/?q=library+resources">Library Resources</a><br>
            <a href="/?q=research+papers">Research Database</a><br>
            <a href="/?q=faculty+directory">Faculty Directory</a>
          </p>
        </div>
        
        <div class="contact-info">
          <h3>Contact Information</h3>
          <p>
            <strong>Office:</strong> Room ${Math.floor(Math.random() * 999) + 100}, Academic Building<br>
            <strong>Phone:</strong> (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}<br>
            <strong>Email:</strong> <a href="mailto:info@${domain}">info@${domain}</a><br>
            <strong>Office Hours:</strong> Mon/Wed/Fri 2:00-4:00 PM
          </p>
        </div>
        
        <div class="last-updated">
          Last updated: ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} ${escapeHtml(getInstitutionName(domain))}<br>
          All rights reserved. This page is optimized for Netscape Navigator 4.0+<br>
          <a href="/?p=webmaster.html">Contact Webmaster</a> | 
          <a href="/?p=accessibility.html">Accessibility</a> | 
          <a href="/?p=privacy.html">Privacy Policy</a></p>
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

function getInstitutionName(domain: string): string {
  const parts = domain.replace('www.', '').split('.');
  const name = parts[0];
  const types = [
    'University',
    'College', 
    'Institute',
    'Academy',
    'School'
  ];
  const type = types[Math.floor(Math.random() * types.length)];
  
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') + ` ${type}`;
}

function getDepartment(): string {
  const departments = [
    'Computer Science',
    'Mathematics', 
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'English Literature',
    'Philosophy',
    'Psychology',
    'Economics',
    'Political Science',
    'Sociology'
  ];
  return departments[Math.floor(Math.random() * departments.length)];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}