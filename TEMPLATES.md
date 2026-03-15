# Website Templates

The Fake WWW app now includes 5 distinct website templates that are automatically selected based on domain names and content analysis.

## Available Templates

### 1. Corporate Template 🏢
**Style:** Professional business design with conservative colors
- **Colors:** Navy blue header, gray accents
- **Font:** Times New Roman (formal serif)
- **Layout:** Traditional corporate structure
- **Features:** Professional taglines, visitor counters, under construction banners
- **Best for:** Business domains, corporate sites, professional services

### 2. Personal Template 🏠 
**Style:** Colorful personal homepage with playful design
- **Colors:** Rainbow gradients, pink/blue/yellow pastels
- **Font:** Comic Sans MS (casual/friendly)
- **Layout:** Bordered boxes with lots of personality
- **Features:** Personal taglines, cool links sidebar, guestbook
- **Best for:** Personal names, individual homepages, fan sites

### 3. Academic Template 🎓
**Style:** Scholarly institutional design
- **Colors:** Brown/tan earth tones
- **Font:** Garamond (academic serif)
- **Layout:** Clean, text-focused layout
- **Features:** Department info, contact details, publication lists
- **Best for:** .edu domains, university sites, research pages

### 4. Startup Template 🚀
**Style:** Dark tech theme with neon accents
- **Colors:** Black background with cyan/orange highlights
- **Font:** Verdana (modern tech)
- **Layout:** Futuristic with Matrix-style effects
- **Features:** Stock tickers, VC links, innovation messaging
- **Best for:** Tech startups, .io domains, innovation companies

### 5. GeoCities Template 🌈
**Style:** Classic 90s personal homepage aesthetic
- **Colors:** Every color possible, rainbow backgrounds
- **Font:** Arial with heavy use of styling
- **Layout:** Table-based with maximum visual chaos
- **Features:** Visitor counters, MIDI music, web rings, marquees
- **Best for:** Personal sites, fan pages, hobby sites

## Template Selection Logic

The `TemplateSelector` service automatically chooses templates based on:

### Domain Analysis
- **.edu** domains → Academic template
- **.org** domains → Corporate or Academic  
- **.io** domains → Startup template
- Names with numbers → GeoCities template
- Keywords like "startup", "tech" → Startup template
- Keywords like "university", "college" → Academic template

### Content Analysis
- Business keywords → Corporate template
- Personal/individual keywords → Personal or GeoCities template
- Tech/innovation keywords → Startup template
- Academic/research keywords → Academic template

### Weighted Randomization
- Templates are scored based on keyword matches
- Top 3 candidates are considered
- Weighted random selection adds variety
- Results are cached per domain for consistency

## Template Features

All templates include:
- ✅ **Loading cursors** during navigation
- ✅ **Retro early-web styling** authentic to 1995-2003 era
- ✅ **Internal navigation** with themed styling
- ✅ **Visitor counters** with random numbers
- ✅ **Period-appropriate messaging** and terminology
- ✅ **Responsive JavaScript** for interactivity
- ✅ **Nostalgic elements** like web rings, guestbooks, under construction

## Usage

Templates are automatically selected - no configuration needed! The system intelligently matches content to appropriate styles while maintaining the authentic early-web feel across all variations.

```typescript
// Template selection happens automatically in website.ts
const selectedTemplate = templateSelector.selectTemplate(domain, pageData.content);
return selectedTemplate.template(domain, path, pageData);
```

This creates a diverse and authentic fake web experience where every generated site feels appropriate for its domain and content type! 🎨