# Open Source SEO Tools

A curated collection of open source tools, scripts, and utilities for technical SEO analysis, automation, and optimization.

## 🔧 Analysis & Auditing Tools

### Core Web Vitals Monitoring
- **[Web Vitals Library](https://github.com/GoogleChrome/web-vitals)** - Official Google library for measuring Core Web Vitals
- **[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)** - Automated Lighthouse testing in CI/CD
- **[Unlighthouse](https://unlighthouse.dev/)** - Site-wide Lighthouse scanning tool

### Technical SEO Auditing
- **[SEO Analyzer](https://github.com/maddevsio/seo-analyzer)** - CLI tool for SEO analysis
- **[Sitemap Generator](https://github.com/ekalinin/sitemap.js)** - Generate XML sitemaps programmatically
- **[Broken Link Checker](https://github.com/stevenvachon/broken-link-checker)** - Find broken links in websites

## 📊 Data Collection & APIs

### Search Console Integration
```python
# Google Search Console API wrapper
from searchconsole import authenticate

# Authenticate and get account
account = authenticate(client_config='client_secrets.json')
webproperty = account['https://example.com/']

# Get search analytics data
report = webproperty.query.range('2024-01-01', '2024-12-31').get()
```

### Crawling & Scraping
- **[Scrapy](https://scrapy.org/)** - Professional web scraping framework
- **[Crawlee](https://crawlee.dev/)** - Modern web scraping and browser automation
- **[Puppeteer](https://pptr.dev/)** - Headless Chrome automation

## 🚀 Performance Optimization

### Image Optimization
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing
- **[Squoosh CLI](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli)** - Image compression from command line
- **[ImageOptim CLI](https://github.com/JamieMason/ImageOptim-CLI)** - Batch image optimization

### Build Tools
- **[Critical](https://github.com/addyosmani/critical)** - Extract critical CSS
- **[PurgeCSS](https://purgecss.com/)** - Remove unused CSS
- **[Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)** - Visualize bundle size

## 🔍 Monitoring & Alerting

### Uptime & Performance
```bash
#!/bin/bash
# Simple uptime monitoring script
check_site() {
    local url=$1
    local response=$(curl -s -o /dev/null -w "%{http_code},%{time_total}" "$url")
    local status_code=$(echo $response | cut -d',' -f1)
    local response_time=$(echo $response | cut -d',' -f2)
    
    if [ "$status_code" != "200" ]; then
        echo "ALERT: $url returned $status_code"
    elif (( $(echo "$response_time > 2.0" | bc -l) )); then
        echo "ALERT: $url slow response: ${response_time}s"
    fi
}

# Monitor critical pages
check_site "https://example.com/"
check_site "https://example.com/products/"
```

### Log Analysis
- **[GoAccess](https://goaccess.io/)** - Real-time web log analyzer
- **[AWStats](https://awstats.sourceforge.io/)** - Advanced web statistics
- **[Logstash](https://www.elastic.co/logstash)** - Data processing pipeline

## 🛠️ Custom Scripts & Utilities

### Schema Markup Validator
```javascript
// Validate structured data on pages
const validateSchema = async (url) => {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const jsonLd = $('script[type="application/ld+json"]').map((i, el) => {
    try {
      return JSON.parse($(el).html());
    } catch (e) {
      return null;
    }
  }).get().filter(Boolean);
  
  // Validate against schema.org
  for (const schema of jsonLd) {
    const validation = await validateAgainstSchema(schema);
    if (!validation.valid) {
      console.log(`Schema validation failed for ${url}:`, validation.errors);
    }
  }
};
```

### Hreflang Checker
```python
# Check hreflang implementation
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def check_hreflang(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    hreflang_links = soup.find_all('link', {'rel': 'alternate'})
    
    for link in hreflang_links:
        hreflang = link.get('hreflang')
        href = link.get('href')
        
        if hreflang and href:
            # Validate the alternate URL exists
            alt_response = requests.head(urljoin(url, href))
            if alt_response.status_code != 200:
                print(f"Broken hreflang: {hreflang} -> {href}")
```

## 📈 Analytics & Reporting

### Custom Dashboards
- **[Grafana](https://grafana.com/)** - Visualization and monitoring
- **[Metabase](https://www.metabase.com/)** - Open source BI tool
- **[Apache Superset](https://superset.apache.org/)** - Modern data exploration

### Data Processing
- **[Pandas](https://pandas.pydata.org/)** - Data analysis library
- **[Apache Airflow](https://airflow.apache.org/)** - Workflow orchestration
- **[dbt](https://www.getdbt.com/)** - Data transformation tool

## 🔗 API Integrations

### Search Engine APIs
- **Google Search Console API** - Search performance data
- **Bing Webmaster Tools API** - Bing search data
- **Google PageSpeed Insights API** - Performance metrics
- **Google Analytics Reporting API** - Traffic analysis

### SEO Tool APIs
- **Ahrefs API** - Backlink and keyword data
- **SEMrush API** - Competitive intelligence
- **Moz API** - Domain authority and link metrics

## 📚 Learning Resources

### Documentation
- **[Google Search Central](https://developers.google.com/search)** - Official SEO documentation
- **[Web.dev](https://web.dev/)** - Performance and best practices
- **[MDN Web Docs](https://developer.mozilla.org/)** - Web standards reference

### Communities
- **[r/TechnicalSEO](https://reddit.com/r/TechnicalSEO)** - Technical SEO discussions
- **[SEO Discord Communities](https://discord.gg/seo)** - Real-time SEO chat
- **[GitHub SEO Topics](https://github.com/topics/seo)** - Open source SEO projects

---

*All tools are regularly tested and updated. Found a broken link or have a suggestion? [Submit an issue](https://github.com/dsottimano/opensourceseo/issues).* 