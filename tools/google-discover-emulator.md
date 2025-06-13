# Google Discover Emulator

Test how your articles might appear in Google Discover feed and get real-time SEO optimization feedback.

<GoogleDiscoverEmulator />

## How to Use This Tool

### 1. Enter Article Details
Fill in your article information in the form above:
- **Title**: Keep it between 30-60 characters for optimal display
- **Description**: Aim for 120-160 characters to avoid truncation
- **Featured Image**: Use high-quality images (1200x630px recommended)
- **Site Name**: Your brand or publication name

### 2. Preview Your Article
See how your article appears in Google Discover on mobile devices. The preview updates in real-time as you type.

### 3. Review SEO Analysis
Get instant feedback on:
- Title optimization
- Description length and quality
- Image format and optimization
- Overall Discover readiness

## Google Discover Optimization Tips

### Title Best Practices
- **Length**: 30-60 characters work best
- **Numbers**: Include specific numbers when relevant
- **Emotion**: Use power words that evoke curiosity
- **Keywords**: Include your target keyword naturally

### Description Guidelines
- **Length**: 120-160 characters for full display
- **Value**: Clearly communicate the article's value
- **Keywords**: Include related keywords naturally
- **CTA**: End with a subtle call-to-action

### Image Requirements
- **Dimensions**: 1200x630px (1.91:1 aspect ratio)
- **Format**: WebP for best performance, JPEG as fallback
- **Quality**: High-resolution, visually appealing
- **Relevance**: Directly related to article content

## Technical Implementation

This tool is built with Vue.js and demonstrates how to create interactive SEO tools within VitePress:

```vue
<template>
  <div class="discover-emulator">
    <!-- Interactive form and preview -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive data and computed properties
const article = ref({
  title: '',
  description: '',
  image: ''
})
</script>
```

### Key Features
- **Real-time Preview**: See changes instantly
- **SEO Scoring**: Automated optimization analysis
- **Mobile-first**: Optimized for mobile Discover experience
- **Responsive Design**: Works on all device sizes

## Understanding Google Discover

Google Discover is a personalized content feed that appears on:
- Google mobile homepage
- Google app
- Chrome new tab page (mobile)

### Discover Ranking Factors
1. **Content Quality**: High-quality, original content
2. **User Interest**: Aligned with user's search history
3. **Freshness**: Recent, timely content
4. **Performance**: Fast loading, good Core Web Vitals
5. **Images**: High-quality, relevant visuals

### Getting into Discover
- **No direct submission**: Google automatically includes eligible content
- **Quality threshold**: Must meet Google's quality guidelines
- **Performance matters**: Fast loading times are crucial
- **Mobile optimization**: Mobile-first indexing applies

## Advanced Tips

### Schema Markup
Add Article structured data to improve Discover eligibility:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "image": "https://example.com/image.jpg",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Site Name"
  },
  "datePublished": "2024-12-13"
}
```

### Performance Optimization
- **Core Web Vitals**: Optimize LCP, FID, and CLS
- **Image Optimization**: Use modern formats and proper sizing
- **Caching**: Implement aggressive caching strategies
- **CDN**: Use a content delivery network

---

*Want to build your own SEO tools? Check out our [Vue.js integration guide](/guides/vue-components) for VitePress.* 