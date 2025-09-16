# LumenSparkXY Personal Website - Copilot Instructions

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## About This Project

LumenSparkXY is a modern, responsive personal website for an organic daal (lentils) business. It's a static website built with pure HTML5, CSS3, and JavaScript (ES6+). The website serves as both a business portfolio and e-commerce showcase with no backend dependencies.

## Working Effectively

### Quick Start Commands
- **Run the website locally**: `cd /home/runner/work/lumensparkxy.github.io/lumensparkxy.github.io && python3 -m http.server 8000`
- **Access the website**: Navigate to `http://localhost:8000` in browser
- **View file structure**: `ls -la` shows: `index.html`, `styles.css`, `script.js`, `favicon.svg`, `images/`, `README.md`

### No Build Process Required
- This is a **static website** with NO build process, NO package.json, NO dependencies to install
- **Do NOT** run `npm install`, `npm build`, or any Node.js commands - they are not needed
- **Do NOT** look for package managers, build tools, or configuration files - none exist
- Simply open `index.html` in a browser or serve with any HTTP server

### Development Server Setup
```bash
# Start local development server (takes 1-2 seconds)
cd /home/runner/work/lumensparkxy.github.io/lumensparkxy.github.io
python3 -m http.server 8000
# Access at: http://localhost:8000
```

## Validation Requirements

### Manual Testing Scenarios
**ALWAYS test these scenarios after making changes:**

1. **Navigation Testing**:
   - Click each navigation link (Home, About Us, Our Products, Quality & Certification, Contact)
   - Verify smooth scrolling to correct sections
   - Confirm active navigation link highlighting works

2. **Interactive Features**:
   - Test "Order Now" buttons - should log to console and prevent default navigation
   - Click email contact item - should trigger `mailto:orders@organicdaal.com`
   - Hover over product cards - should show visual hover effects
   - Test typing animation in hero section on page load

3. **Responsive Design**:
   - Test on desktop (1200px+), tablet (768-1199px), mobile (<768px)
   - Verify hamburger menu works on mobile (if implemented)
   - Check all images and content scale properly

4. **Content Verification**:
   - Ensure all 6 daal products display correctly with images
   - Verify stats counter animation in About section
   - Check all certification badges and quality standards appear
   - Confirm contact information is complete and functional

### Browser Testing
- **Test in multiple browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Expected load time**: 1-3 seconds (website is optimized)
- **Console errors**: Only external CDN blocking is expected (Font Awesome, Google Fonts)

## File Structure and Key Locations

```
├── index.html          # Main HTML file - all content is here
├── styles.css          # All CSS styles and responsive design
├── script.js           # JavaScript functionality and animations
├── favicon.svg         # Website favicon (custom "L" logo)
├── images/             # Product images (6 SVG files for daal types)
│   ├── masoor-daal.svg
│   ├── moong-daal.svg
│   ├── chana-daal.svg
│   ├── toor-daal.svg
│   ├── urad-daal.svg
│   └── rajma.svg
└── README.md          # Project documentation
```

## Common Development Tasks

### Making Content Changes
- **Hero section**: Edit the `<section class="hero">` in `index.html`
- **Product information**: Modify product cards in `<section id="products">` 
- **Contact details**: Update `<section id="contact">` with real contact info
- **Company information**: Edit `<section id="about">` for business details

### Styling Changes
- **Color scheme**: Modify CSS custom properties in `:root` section of `styles.css`
- **Responsive breakpoints**: Desktop (1200px+), Tablet (768-1199px), Mobile (<768px)
- **Typography**: Uses Inter font from Google Fonts
- **Icons**: Font Awesome 6.0.0 via CDN

### JavaScript Functionality
- **Navigation**: Smooth scrolling and active link highlighting
- **Animations**: Typing effect, counter animation, scroll animations
- **Interactions**: Project card hovers, contact form handlers
- **Performance**: Page load time monitoring built-in

## Deployment

### GitHub Pages (Automatic)
- **No build step required** - GitHub Pages serves static files directly
- Changes pushed to `main` branch are automatically deployed
- Site URL: `https://lumensparkxy.github.io/`

### Local Development
- Use any HTTP server: `python3 -m http.server`, `live-server`, or similar
- **Do NOT** use `file://` protocol - external resources will be blocked

## Browser Compatibility

- **Supported**: Chrome, Firefox, Safari, Edge (latest versions)
- **Features used**: CSS Grid, Flexbox, CSS Custom Properties, ES6+ JavaScript
- **External dependencies**: Font Awesome (icons), Google Fonts (typography)

## Troubleshooting

### Common Issues
- **Images not loading**: Check `images/` directory and file paths in HTML
- **Styling broken**: Verify `styles.css` link in HTML head
- **JavaScript errors**: Check browser console, ensure `script.js` loads
- **Font/Icon issues**: CDN blocking expected in some environments

### Performance
- **Expected page load**: 1-3 seconds
- **File sizes**: HTML (~18KB), CSS (~13KB), JS (~11KB), Images (~2KB each)
- **No optimization needed**: Files are already minified and optimized

## Important Notes

- **Template nature**: This is currently an organic daal business template
- **Placeholder content**: All contact info, company details are sample data
- **No backend**: Pure frontend website with no server-side functionality
- **No tests**: No formal testing framework - use manual validation scenarios above
- **No linting**: No ESLint or other linting tools configured

## Quick Reference Commands

```bash
# Repository navigation
cd /home/runner/work/lumensparkxy.github.io/lumensparkxy.github.io

# Start development server
python3 -m http.server 8000

# View file structure
ls -la

# Check file contents
head -10 index.html
head -10 styles.css  
head -10 script.js

# Image directory
ls -la images/
```

**Remember**: This is a static website - keep it simple and avoid unnecessary complexity!