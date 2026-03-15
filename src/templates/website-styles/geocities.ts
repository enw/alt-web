export interface PageData {
  title: string;
  content: string;
  navigation: Array<{ text: string; url: string }>;
}

export function getGeocitiesTemplate(domain: string, path: string, pageData: PageData): string {
  const navHtml = pageData.navigation.map(nav => 
    `<a href="/?p=${encodeURIComponent(nav.url)}" class="nav-link">${escapeHtml(nav.text)}</a>`
  ).join(' ~ ');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${escapeHtml(pageData.title)}</title>
      <meta charset="utf-8">
      <style>
        body {
          font-family: "Arial", "Helvetica", sans-serif;
          margin: 0;
          padding: 0;
          background: url('data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYLJd8pqU4DjdD1JFiUZKAAAh+QQACgAEACwAAAAAEAAQAAADSAi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sCgJvhNxC0X9HQUAOwAAAAAAAAAAAP///AAAwAAAAAAAAAAA');
          color: #000080;
        }
        body.loading {
          cursor: wait;
        }
        body.loading * {
          cursor: wait !important;
        }
        .container {
          margin: 0;
          padding: 10px;
          background: #ffffff;
          border: 8px ridge #c0c0c0;
          margin: 10px;
        }
        .header {
          text-align: center;
          background: linear-gradient(45deg, #ff69b4, #87ceeb, #98fb98, #f0e68c);
          border: 4px outset #c0c0c0;
          padding: 20px;
          margin-bottom: 15px;
        }
        .site-title {
          font-size: 28px;
          font-weight: bold;
          color: #8b0000;
          text-shadow: 3px 3px 0px #ff69b4;
          margin: 0;
          animation: pulse 2s infinite;
        }
        .welcome-text {
          font-size: 16px;
          color: #4169e1;
          margin: 10px 0;
          font-style: italic;
        }
        .rainbow-text {
          background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: bold;
        }
        .navigation {
          background: #ffff99;
          border: 3px dotted #ff1493;
          padding: 15px;
          text-align: center;
          margin: 15px 0;
        }
        .nav-link {
          color: #8b0000;
          text-decoration: none;
          font-weight: bold;
          font-size: 14px;
          margin: 0 5px;
        }
        .nav-link:hover {
          color: #ff1493;
          text-decoration: underline;
          background: #ffb6c1;
          padding: 2px;
        }
        .content {
          background: #f0f8ff;
          border: 2px dashed #32cd32;
          padding: 20px;
          margin: 15px 0;
          font-size: 14px;
          line-height: 1.6;
        }
        .content h1 {
          color: #dc143c;
          font-size: 20px;
          text-decoration: underline;
          margin-top: 0;
        }
        .content h2 {
          color: #228b22;
          font-size: 18px;
          background: #ffffe0;
          padding: 5px;
          border: 1px solid #ffd700;
        }
        .content h3 {
          color: #4169e1;
          font-size: 16px;
          font-style: italic;
        }
        .content p {
          margin-bottom: 12px;
        }
        .sidebar {
          background: #ffe4e1;
          border: 4px groove #ff69b4;
          padding: 15px;
          margin: 15px 0;
          float: right;
          width: 200px;
          font-size: 12px;
        }
        .sidebar h3 {
          color: #ff1493;
          font-size: 14px;
          text-align: center;
          margin-top: 0;
          text-decoration: underline;
        }
        .guestbook {
          background: #e6e6fa;
          border: 3px double #9370db;
          padding: 15px;
          text-align: center;
          margin: 20px 0;
        }
        .guestbook h3 {
          color: #8b008b;
          margin-top: 0;
        }
        .visitor-counter {
          background: #000000;
          color: #00ff00;
          font-family: "Courier New", monospace;
          padding: 10px;
          text-align: center;
          border: 2px inset #c0c0c0;
          margin: 15px 0;
          font-size: 12px;
        }
        .footer {
          clear: both;
          text-align: center;
          background: #fafad2;
          border: 2px solid #daa520;
          padding: 15px;
          margin-top: 20px;
          font-size: 10px;
        }
        .award {
          display: inline-block;
          margin: 5px;
          padding: 5px;
          background: #ffd700;
          border: 2px outset #daa520;
          font-size: 9px;
          text-align: center;
        }
        .blink {
          animation: blink 1s linear infinite;
        }
        .marquee-container {
          background: #ff0000;
          color: #ffffff;
          padding: 5px;
          margin: 10px 0;
          border: 1px solid #000000;
          overflow: hidden;
        }
        .floating-gif {
          position: absolute;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .midi-player {
          background: #c0c0c0;
          border: 2px inset #c0c0c0;
          padding: 10px;
          margin: 10px 0;
          text-align: center;
          font-size: 11px;
        }
        table.layout {
          width: 100%;
          border: 0;
          cellpadding: 0;
          cellspacing: 0;
        }
      </style>
    </head>
    <body>
      <div class="floating-gif" style="top: 20px; right: 50px;">⭐</div>
      <div class="floating-gif" style="top: 100px; left: 30px;">🌟</div>
      
      <div class="container">
        <div class="header">
          <h1 class="site-title">${escapeHtml(getGeocitiesTitle(domain))}</h1>
          <p class="welcome-text">
            <span class="rainbow-text">Welcome to my awesome homepage!</span>
          </p>
          <p style="font-size: 12px; color: #8b0000;">
            <span class="blink">★ NEW! ★</span> Site updated ${new Date().toLocaleDateString()} <span class="blink">★ COOL! ★</span>
          </p>
        </div>
        
        <div class="marquee-container">
          <marquee behavior="scroll" direction="left">
            🎵 Now Playing: ${getRandomSong()} 🎵 &nbsp;&nbsp;&nbsp; 
            Welcome to the ${getNeighborhood()} neighborhood! &nbsp;&nbsp;&nbsp;
            <span class="blink">🔥 HOT SITE! 🔥</span>
          </marquee>
        </div>
        
        <table class="layout">
          <tr>
            <td width="70%" valign="top">
              <div class="navigation">
                <strong>🏠 Navigation 🏠</strong><br>
                ${navHtml}
              </div>
              
              <div class="content">
                ${pageData.content}
              </div>
            </td>
            <td width="30%" valign="top">
              <div class="sidebar">
                <h3>🔗 Cool Links 🔗</h3>
                <p>
                  <a href="/?q=geocities+neighborhood">My Neighborhood</a><br>
                  <a href="/?q=web+rings">Web Rings</a><br>
                  <a href="/?q=free+graphics">Free Graphics</a><br>
                  <a href="/?q=midi+files">MIDI Files</a><br>
                  <a href="/?q=chat+rooms">Chat Rooms</a><br>
                  <a href="/?q=email+me">Email Me!</a>
                </p>
                
                <h3>🎨 My Interests 🎨</h3>
                <p style="font-size: 11px;">
                  ${getRandomInterests()}
                </p>
                
                <div class="visitor-counter">
                  <strong>VISITOR COUNTER</strong><br>
                  You are visitor #${Math.floor(Math.random() * 99999) + 1000}<br>
                  Since ${new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
            </td>
          </tr>
        </table>
        
        <div class="guestbook">
          <h3>📝 Please Sign My Guestbook! 📝</h3>
          <p><a href="/?p=guestbook.html" style="color: #8b008b; font-weight: bold;">
            Click here to leave a message!</a></p>
          <p style="font-size: 10px;">
            Last signed by: <em>CoolSurfer99</em> - "Awesome site! Keep it up! 😎"
          </p>
        </div>
        
        <div class="midi-player">
          🎵 <strong>Background Music:</strong> ${getRandomSong()} 
          <span style="font-size: 9px;">[MIDI - Auto-play enabled]</span> 🎵
        </div>
        
        <div class="footer">
          <div class="award">🏆<br>Best Site<br>Award</div>
          <div class="award">⭐<br>5 Star<br>Rating</div>
          <div class="award">🎖️<br>Cool Site<br>of the Day</div>
          
          <p>© ${new Date().getFullYear()} ${escapeHtml(getGeocitiesTitle(domain))}<br>
          <span style="color: #8b0000;">This site is part of the ${getNeighborhood()} neighborhood</span><br>
          Made with ❤️ and HTML 3.2 • Best viewed with Netscape Navigator 3.0+</p>
          
          <p style="font-size: 8px;">
            <span class="blink">Under Construction!</span> | 
            <a href="/?p=webmaster.html">Contact Webmaster</a> | 
            <a href="/?q=geocities+help">GeoCities Help</a>
          </p>
          
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" 
               alt="GeoCities" style="width: 80px; height: 15px; background: #ff6600; color: white; text-align: center; margin: 5px;">
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

function getGeocitiesTitle(domain: string): string {
  const parts = domain.replace('www.', '').split('.');
  const name = parts[0];
  const titles = [
    `${name}'s Totally Awesome Homepage`,
    `The Amazing ${name} Site`,
    `${name}'s Corner of the Web`,
    `Welcome to ${name}'s World`,
    `${name}'s Super Cool Page`,
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

function getNeighborhood(): string {
  const neighborhoods = [
    'SiliconValley', 'Hollywood', 'SunsetStrip', 'BourbonStreet', 
    'TimesSquare', 'HeartlandPlains', 'WestHollywood', 'CapitolHill',
    'FashionDistrict', 'EnchantedForest', 'Area51', 'Colosseum'
  ];
  return neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
}

function getRandomSong(): string {
  const songs = [
    'Pachelbel - Canon in D', 'Bach - Brandenburg Concerto',
    'Mozart - Eine kleine Nachtmusik', 'Beethoven - Ode to Joy',
    'Chopin - Minute Waltz', 'Greensleeves', 'Amazing Grace',
    'Theme from Titanic', 'Final Fantasy VII Theme', 'Zelda Theme'
  ];
  return songs[Math.floor(Math.random() * songs.length)];
}

function getRandomInterests(): string {
  const interests = [
    'Web Design • HTML • JavaScript • Computer Graphics • 3D Animation • Video Games • Music • Movies • Science Fiction • Fantasy • Anime • Manga • Chat Rooms • Email Pen Pals',
    'Photography • Digital Art • Web Graphics • MIDI Music • Online Gaming • Chat • Email • Message Boards • Web Rings • Banner Exchanges • Free Stuff • Cool Sites',
    'Computers • Internet • Programming • Graphics Design • Music Composition • Online Communities • Virtual Pets • Greeting Cards • Clip Art • Free Downloads'
  ];
  return interests[Math.floor(Math.random() * interests.length)];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}