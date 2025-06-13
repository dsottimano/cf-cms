# Core Web Vitals Optimization Guide

**Difficulty:** 🟡 Intermediate | **Updated:** December 2024

Core Web Vitals are essential metrics that measure real-world user experience. This guide covers everything you need to know to optimize for LCP, FID, and CLS.

## What Are Core Web Vitals?

Google's Core Web Vitals consist of three key metrics:

- **LCP (Largest Contentful Paint)** - Loading performance
- **FID (First Input Delay)** - Interactivity 
- **CLS (Cumulative Layout Shift)** - Visual stability

## 🎯 Target Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| FID | ≤ 100ms | 100ms - 300ms | > 300ms |
| CLS | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

## 🚀 LCP Optimization

### 1. Optimize Server Response Time (TTFB)

```bash
# Check TTFB with curl
curl -w "@curl-format.txt" -o /dev/null -s "https://example.com"

# curl-format.txt content:
#     time_namelookup:  %{time_namelookup}\n
#        time_connect:  %{time_connect}\n
#     time_appconnect:  %{time_appconnect}\n
#    time_pretransfer:  %{time_pretransfer}\n
#       time_redirect:  %{time_redirect}\n
#  time_starttransfer:  %{time_starttransfer}\n
#                     ----------\n
#          time_total:  %{time_total}\n
```

### 2. Preload Critical Resources

```html
<!-- Preload hero image -->
<link rel="preload" as="image" href="/hero-image.webp" fetchpriority="high">

<!-- Preload critical CSS -->
<link rel="preload" as="style" href="/critical.css">

<!-- Preload key fonts -->
<link rel="preload" as="font" type="font/woff2" href="/font.woff2" crossorigin>
```

### 3. Optimize Images

```html
<!-- Use modern formats with fallbacks -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero image" width="800" height="600" fetchpriority="high">
</picture>
```

## ⚡ FID/INP Optimization

### 1. Minimize JavaScript Execution Time

```javascript
// Bad: Blocking main thread
function heavyCalculation() {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random();
  }
  return result;
}

// Good: Use Web Workers for heavy tasks
const worker = new Worker('heavy-calculation-worker.js');
worker.postMessage({iterations: 1000000});
worker.onmessage = (e) => {
  console.log('Result:', e.data);
};
```

### 2. Code Splitting and Lazy Loading

```javascript
// Dynamic imports for non-critical code
const loadAnalytics = async () => {
  const { initAnalytics } = await import('./analytics.js');
  initAnalytics();
};

// Load after user interaction
document.addEventListener('click', loadAnalytics, { once: true });
```

## 📐 CLS Optimization

### 1. Reserve Space for Dynamic Content

```css
/* Reserve space for ads */
.ad-container {
  width: 300px;
  height: 250px;
  background: #f0f0f0;
}

/* Aspect ratio boxes for images */
.image-container {
  aspect-ratio: 16 / 9;
  background: #f0f0f0;
}
```

### 2. Font Loading Optimization

```css
/* Prevent layout shift during font load */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
  size-adjust: 95%; /* Match fallback font metrics */
}

body {
  font-family: 'CustomFont', Arial, sans-serif;
}
```

## 🔧 Monitoring Tools

### 1. Real User Monitoring (RUM)

```javascript
// Web Vitals library
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

### 2. Performance Observer API

```javascript
// Monitor LCP candidates
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP candidate:', entry.element, entry.startTime);
  }
});

observer.observe({type: 'largest-contentful-paint', buffered: true});
```

## 📊 Testing Checklist

- [ ] Test on real devices (not just desktop)
- [ ] Test with slow 3G connection
- [ ] Test with CPU throttling enabled
- [ ] Monitor field data in Search Console
- [ ] Set up automated monitoring alerts

## 🛠️ Useful Tools

- **[PageSpeed Insights](https://pagespeed.web.dev/)** - Google's official tool
- **[WebPageTest](https://webpagetest.org/)** - Detailed performance analysis
- **[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)** - Automated testing
- **[Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)** - Real-time metrics

---

*Next: [Site Speed Optimization](/guides/site-speed) →* 