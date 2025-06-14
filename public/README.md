# Public Assets Directory

This directory contains static assets that are served directly by VitePress.

## Adding Your Logo

1. **Place your logo file here as `logo.png`**
   - Recommended size: 1200x630px for social sharing
   - Format: PNG with transparent background preferred
   - File name: `logo.png` (exactly as configured)

2. **Logo Usage:**
   - **Navbar**: Appears next to site title
   - **Homepage**: Large hero image
   - **Favicon**: Browser tab icon
   - **Social Sharing**: Open Graph and Twitter cards

## File Structure
```
public/
├── logo.png          # Your main logo
├── favicon.ico       # Optional: dedicated favicon
└── og-image.png      # Optional: dedicated social sharing image
```

## Logo Specifications

### Navbar Logo
- **Size**: 32x32px to 40x40px (auto-scaled)
- **Format**: PNG, SVG, or WebP
- **Background**: Transparent preferred

### Hero Logo
- **Size**: 400x400px recommended
- **Format**: PNG, SVG, or WebP
- **Style**: Can be larger, more detailed version

### Social Sharing
- **Size**: 1200x630px (1.91:1 aspect ratio)
- **Format**: PNG or JPG
- **Text**: Should be readable when scaled down

## Alternative Configurations

If you want different images for different uses:

```javascript
// .vitepress/config.mjs
export default defineConfig({
  themeConfig: {
    logo: '/navbar-logo.png',  // Navbar logo
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
  ]
})
```

```markdown
<!-- index.md hero section -->
hero:
  image:
    src: /hero-logo.png
    alt: OpenSourceSEO
``` 