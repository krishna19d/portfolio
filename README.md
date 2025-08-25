# Krishna Mahajan - Portfolio Website

A sleek, modern, fully responsive portfolio website built with vanilla HTML5, CSS3, and JavaScript. Features dark/light mode, smooth animations, and comprehensive accessibility support.

## 🚀 Live Demo

[View Live Portfolio](https://krishna19d.github.io/portfolio)

## 🌟 Features

### Core Features

- **Fully Responsive Design** - Mobile-first approach, tested across all device sizes
- **Dark/Light Mode Toggle** - Automatic system preference detection with manual override
- **Smooth Scroll Navigation** - Active section highlighting with smooth scrolling
- **Interactive Animations** - Typewriter effect, skill bars, number counters, and scroll animations
- **Project Modal System** - Detailed project showcases with image galleries
- **Contact Form** - Client-side validation with success/error notifications
- **Performance Optimized** - Lazy loading, preloading, and minimal dependencies

### Accessibility Features

- **WCAG 2.1 Compliant** - Semantic HTML, ARIA labels, keyboard navigation
- **Screen Reader Support** - Proper heading structure and live regions
- **Focus Management** - Visible focus indicators and modal focus trapping
- **Motion Respect** - Honors `prefers-reduced-motion` user preference

### SEO & Analytics

- **Schema.org Structured Data** - Person, WebSite, and BreadcrumbList markup
- **Open Graph & Twitter Cards** - Social media preview optimization
- **Google Analytics Ready** - (Placeholder integration included)
- **Performance Optimized** - Target: Lighthouse 90+ scores across all metrics

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Custom Properties), Vanilla JavaScript (ES6+)
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Inter (Google Fonts)
- **Build**: No build step required - pure vanilla stack
- **Deployment**: Any static hosting (GitHub Pages, Netlify, Vercel)

## 📁 Project Structure

```
Portfolio site/
├── index.html              # Main HTML file
├── style.css              # Complete CSS with design system
├── script.js              # Interactive JavaScript functionality
├── README.md              # This file
├── assets/                # Asset directory (create and populate)
│   ├── favicon.ico        # TODO: Add your favicon
│   ├── apple-touch-icon.png # TODO: Add your iOS icon
│   ├── social-preview.jpg # TODO: Add social media preview image
│   ├── profile-placeholder.jpg # TODO: Add your profile photo
│   ├── Krishna-Mahajan-Resume.pdf # TODO: Add your resume PDF
│   ├── google-play-badge.png # TODO: Add Play Store badge image
│   ├── lookmaxpro-1.png   # TODO: Add LookMaxPro screenshots
│   ├── lookmaxpro-2.png   # TODO: Add LookMaxPro screenshots
│   ├── lookmaxpro-3.png   # TODO: Add LookMaxPro screenshots
│   ├── lookmaxpro-demo.mp4 # TODO: Add LookMaxPro demo video
│   ├── finance-1.png      # TODO: Add Finance app screenshots
│   ├── finance-2.png      # TODO: Add Finance app screenshots
│   ├── finance-demo.mp4   # TODO: Add Finance app demo video
│   ├── mvp-1.png          # TODO: Add MVP screenshots
│   ├── mvp-demo.mp4       # TODO: Add MVP demo video
│   ├── blog-1.jpg         # TODO: Add blog post images
│   ├── blog-2.jpg         # TODO: Add blog post images
│   ├── blog-3.jpg         # TODO: Add blog post images
│   ├── client-1.jpg       # TODO: Add client testimonial photos
│   ├── client-2.jpg       # TODO: Add client testimonial photos
│   └── client-3.jpg       # TODO: Add client testimonial photos
└── sw.js                  # TODO: Optional service worker for PWA
```

## 🚀 Quick Start

### 1. Clone or Download

```bash
# If using Git
git clone [your-repository-url]
cd portfolio-site

# Or download and extract the ZIP file
```

### 2. Add Your Assets

Replace all placeholder images and files in the `/assets` directory:

**Required Assets:**

- `profile-placeholder.jpg` (250x250px recommended)
- `Krishna-Mahajan-Resume.pdf` (your resume)
- `favicon.ico` (32x32px)
- Project screenshots and demo videos
- Blog post images
- Client testimonial photos

**Recommended Sizes:**

- Profile photo: 250x250px (square, high quality)
- Project screenshots: 1200x800px (16:9 ratio)
- Blog images: 800x400px
- Social preview: 1200x630px
- Favicon: 32x32px

### 3. Customize Content

#### Update Personal Information

Edit `index.html` and modify:

- Contact links (LinkedIn, GitHub, email)
- Project links and descriptions
- Experience timeline
- Testimonials

#### Update Analytics (Optional)

Replace `GA_MEASUREMENT_ID` with your Google Analytics 4 ID in:

- `index.html` (meta section)
- `script.js` (analytics configuration)

#### Update SEO Meta Tags

In `index.html`, update:

- Page title and description
- Open Graph image URLs
- Schema.org structured data

### 4. Deploy

#### GitHub Pages

1. Push to GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

#### Netlify

1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments

#### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the prompts

## 🎨 Customization Guide

### Color Scheme

The design system uses CSS custom properties. Update colors in `style.css`:

```css
:root {
  --accent-primary: #2563eb; /* Primary blue */
  --accent-secondary: #3b82f6; /* Secondary blue */
  --text-primary: #111418; /* Dark text */
  /* Add your brand colors */
}
```

### Typography

Change the font by updating the Google Fonts import and CSS:

```css
/* In index.html */
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">

/* In style.css */
body {
  font-family: "YourFont", sans-serif;
}
```

### Layout

- Adjust spacing using the `--space-*` variables
- Modify breakpoints in the `--bp-*` variables
- Customize shadows with the `--shadow-*` variables

## 📱 Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Features**: CSS Grid, CSS Custom Properties, Intersection Observer, ES6+

## ⚡ Performance Optimization

### Implemented Optimizations

- **Lazy Loading**: Images load only when in viewport
- **Preloading**: Critical assets are preloaded
- **Debounced Scroll**: Optimized scroll event handling
- **Intersection Observer**: Efficient element visibility detection
- **Minimal Dependencies**: Only Font Awesome for icons

### Lighthouse Targets

- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 90+

## 🔧 Development

### Local Development

Simply open `index.html` in your browser. For a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have live-server installed)
npx live-server

# PHP
php -S localhost:8000
```

### Testing

- **Responsive Design**: Test on Chrome DevTools device emulation
- **Accessibility**: Use axe DevTools extension
- **Performance**: Run Lighthouse audits
- **Cross-browser**: Test on multiple browsers

## 📋 TODO Checklist

### Before Launch

- [ ] Replace all placeholder images in `/assets` directory
- [ ] Update Google Analytics ID (or remove if not using)
- [ ] Test all external links
- [ ] Verify contact form functionality
- [ ] Add your actual resume PDF
- [ ] Update social media links
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Check all TODO comments in code

### Optional Enhancements

- [ ] Add service worker for offline functionality
- [ ] Implement actual contact form backend
- [ ] Add blog CMS integration
- [ ] Set up form submission handling
- [ ] Add more project case studies
- [ ] Implement A/B testing

## 🤝 Contributing

This is a personal portfolio template. Feel free to:

1. Fork for your own use
2. Submit bug reports
3. Suggest improvements
4. Share your customized versions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. **Check the browser console** for JavaScript errors
2. **Verify all assets** are properly uploaded
3. **Test on different browsers** to isolate issues
4. **Check network requests** in DevTools
5. **Validate HTML/CSS** using W3C validators

### Common Issues

**Images not loading**: Verify file paths and ensure assets directory is uploaded

**Animations not working**: Check for JavaScript errors and ensure CSS transitions are supported

**Contact form not submitting**: Currently uses a mock submission - implement actual backend

**Dark mode not persisting**: Check localStorage support and console for errors

## 📞 Contact

**Krishna Mahajan**

- **Email**: krishna@example.com (TODO: Update with your email)
- **LinkedIn**: [www.linkedin.com/in/mahajankrishna](https://www.linkedin.com/in/mahajankrishna)
- **GitHub**: [github.com/krishna19d](https://github.com/krishna19d)

---

**Built with ❤️ using vanilla web technologies**
