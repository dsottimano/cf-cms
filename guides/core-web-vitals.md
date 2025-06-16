# Page Speed for Real Business

**Difficulty:** 🟡 Advanced | **Updated:** June 2025

The large majority of websites don't do much, but most are more complicated then they should be.  There is nothing better than well formatted html for all intents and purposes on the web.  For techincal marketing like SEO or anything on the web, you want the equivalent to a giant open door that never squakes, never fails to open, and will never drop a water balloon on your head upon entering. 

Let me explain.

- Every browser accepts html. So, that door is wide open. This is meant to be an open secret, so don't tell anyone.

![Alt text description](/html_support.png)

- Consumers don't care about your fancy animations/reactivity/design.  They care about the information they need to make a decision. 

At some point, someone out there ( you know who you are) decided that page transition or even page load required some fancy loading animation to display - wait for it, plain html. Other infamous web developers decided to slap you in the face with an interstitial that tries to make you sign up to receive spam.  Imagine going to your supermarket, heading to the fruit isle and trying to pick out an orange when... BAM! HEY IT SEEMS YOU LIKE ORANGES, HOW ABOUT YOU GIVE ME YOUR EMAIL SO I CAN SPAM YOU ABOUT ORANGES?  WAIT, DON'T WALK AWAY, OR ELSE YOU'RE AN ORANGE HATER. 

Pair that with an insufferable close button you can't see and you have the digital equivalent to road rage. 

Don't hide your content behind anything (accordions, interstitials, etc..), don't make people wait needlessly, and certainly don't prioritize design over functionality.  These days, consumers have the attention span of squirrels - make it easy. 

- /me opens up Twitter, sees a great post, and whoosh, it's gone. 

It's called page jank [https://www.afasterweb.com/2015/08/29/what-the-jank/] and it's because you're doing things wrong.  






Core Web Vitals (LCP, FID, CLS, etc..) blah blah blah.  Seriously, for the most part you shouldn't complicate web development.  If you're a front end dev reading this, you're probably scratching your neck like Tyrone for that new Svelte/React/Vue feature but save that for authenticated routes please.

For any content that is vital to the business, like the homepage, docs, marketing, even the blog - just stick to html and css.  Yes, seriously. 

Most front-end frameworks provide SSR with hydration and a bunch of other fancy terms that just output easily accessible html. 

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