# Server Configuration for SEO

**Difficulty:** 🟡 Intermediate | **Updated:** December 2024

Proper server configuration is the foundation of technical SEO. This guide covers essential server settings, headers, and optimizations that directly impact search engine crawling and ranking.

## 🔧 Essential HTTP Headers

### 1. Security Headers

```apache
# Apache .htaccess
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
```

```nginx
# Nginx configuration
add_header X-Content-Type-Options nosniff always;
add_header X-Frame-Options DENY always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

### 2. Caching Headers

```apache
# Apache - Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
```

```nginx
# Nginx - Cache static assets
location ~* \.(css|js|png|jpg|jpeg|webp|avif|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🚀 Compression Configuration

### Gzip/Brotli Compression

```apache
# Apache - Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>
```

```nginx
# Nginx - Enable Brotli and Gzip
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;

# Brotli (if module available)
brotli on;
brotli_comp_level 6;
brotli_types
    text/plain
    text/css
    application/json
    application/javascript
    text/xml
    application/xml
    application/xml+rss
    text/javascript;
```

## 🔄 URL Redirects and Canonicalization

### 1. HTTPS Redirect

```apache
# Apache - Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

```nginx
# Nginx - Force HTTPS
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}
```

### 2. WWW vs Non-WWW

```apache
# Apache - Redirect www to non-www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

```nginx
# Nginx - Redirect www to non-www
server {
    listen 443 ssl;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}
```

### 3. Trailing Slash Handling

```apache
# Apache - Remove trailing slashes (except directories)
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{THE_REQUEST} /+[^\s]*\?[^\s]* [NC]
RewriteRule ^(.*)/?$ /$1 [R=301,L]
```

## 🤖 Robots.txt Configuration

### Dynamic Robots.txt

```php
<?php
// robots.php - Dynamic robots.txt
header('Content-Type: text/plain');

$host = $_SERVER['HTTP_HOST'];
$protocol = isset($_SERVER['HTTPS']) ? 'https' : 'http';

echo "User-agent: *\n";

if (strpos($host, 'staging') !== false || strpos($host, 'dev') !== false) {
    echo "Disallow: /\n";
} else {
    echo "Allow: /\n";
    echo "Disallow: /admin/\n";
    echo "Disallow: /private/\n";
    echo "Disallow: /*?*\n"; // Block query parameters
}

echo "\nSitemap: {$protocol}://{$host}/sitemap.xml\n";
?>
```

## 📊 Log File Analysis

### 1. Nginx Log Format for SEO

```nginx
# Custom log format for SEO analysis
log_format seo_log '$remote_addr - $remote_user [$time_local] '
                   '"$request" $status $body_bytes_sent '
                   '"$http_referer" "$http_user_agent" '
                   '$request_time $upstream_response_time '
                   '"$http_x_forwarded_for"';

access_log /var/log/nginx/seo_access.log seo_log;
```

### 2. Analyze Crawl Patterns

```bash
#!/bin/bash
# analyze_crawlers.sh - Analyze search engine crawling

# Extract Googlebot requests
grep "Googlebot" /var/log/nginx/access.log | \
awk '{print $7}' | sort | uniq -c | sort -nr > googlebot_pages.txt

# Check for crawl errors (4xx, 5xx)
grep "Googlebot" /var/log/nginx/access.log | \
awk '$9 >= 400 {print $7, $9}' | sort | uniq -c | sort -nr > crawl_errors.txt

# Response time analysis
grep "Googlebot" /var/log/nginx/access.log | \
awk '{print $7, $NF}' | sort -k2 -nr > slow_pages.txt
```

## 🔍 Server Monitoring

### 1. Health Check Endpoint

```php
<?php
// health.php - Server health check for monitoring
header('Content-Type: application/json');

$checks = [
    'database' => checkDatabase(),
    'cache' => checkCache(),
    'disk_space' => checkDiskSpace(),
    'memory' => checkMemory()
];

$status = array_reduce($checks, function($carry, $check) {
    return $carry && $check['status'];
}, true);

http_response_code($status ? 200 : 503);

echo json_encode([
    'status' => $status ? 'healthy' : 'unhealthy',
    'timestamp' => date('c'),
    'checks' => $checks
]);

function checkDatabase() {
    // Database connectivity check
    try {
        $pdo = new PDO($dsn, $user, $pass);
        return ['status' => true, 'message' => 'Database connected'];
    } catch (PDOException $e) {
        return ['status' => false, 'message' => 'Database connection failed'];
    }
}

function checkDiskSpace() {
    $free = disk_free_space('/');
    $total = disk_total_space('/');
    $percent = ($free / $total) * 100;
    
    return [
        'status' => $percent > 10,
        'free_percent' => round($percent, 2),
        'message' => $percent > 10 ? 'Sufficient disk space' : 'Low disk space'
    ];
}
?>
```

## 🛡️ Security for SEO

### 1. Rate Limiting

```nginx
# Nginx - Rate limiting for crawlers
http {
    limit_req_zone $binary_remote_addr zone=crawlers:10m rate=10r/s;
    
    server {
        location / {
            limit_req zone=crawlers burst=20 nodelay;
            # Your normal configuration
        }
    }
}
```

### 2. Block Bad Bots

```apache
# Apache - Block malicious crawlers
RewriteEngine On
RewriteCond %{HTTP_USER_AGENT} (SemrushBot|AhrefsBot|MJ12bot) [NC]
RewriteRule .* - [F,L]
```

## 📈 Performance Monitoring

### Server Response Time Script

```bash
#!/bin/bash
# monitor_response_times.sh

urls=(
    "https://example.com/"
    "https://example.com/blog/"
    "https://example.com/products/"
)

for url in "${urls[@]}"; do
    response_time=$(curl -o /dev/null -s -w '%{time_total}' "$url")
    echo "$(date): $url - ${response_time}s" >> response_times.log
    
    # Alert if response time > 2 seconds
    if (( $(echo "$response_time > 2.0" | bc -l) )); then
        echo "ALERT: Slow response time for $url: ${response_time}s"
    fi
done
```

## 🔧 Testing Your Configuration

```bash
# Test HTTP headers
curl -I https://example.com

# Test compression
curl -H "Accept-Encoding: gzip,deflate" -I https://example.com

# Test SSL configuration
openssl s_client -connect example.com:443 -servername example.com

# Test redirect chains
curl -L -I https://example.com
```

---

*Next: [Schema Markup Implementation](/guides/schema-markup) →* 