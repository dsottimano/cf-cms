import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OpenSourceSEO",
  description: "Technical SEO guides, open source tools, and in-depth configurations for SEO professionals",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png', // Logo in navbar
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'Blog', link: '/blog/' },
      { 
        text: 'Tools', 
        items: [
          { text: 'All Tools', link: '/tools/' },
          { text: 'Google Discover Emulator', link: '/tools/google-discover-emulator' }
        ]
      },
      { text: 'About', link: '/about' }
    ],

    sidebar: {
      '/guides/': [
        {
          text: 'Technical SEO Guides',
          items: [
            { text: 'Getting Started', link: '/guides/' },
            { text: 'Server Configuration', link: '/guides/server-config' },
            { text: 'Schema Markup', link: '/guides/schema-markup' },
            { text: 'Core Web Vitals', link: '/guides/core-web-vitals' },
            { text: 'Site Speed Optimization', link: '/guides/site-speed' }
          ]
        }
      ],
      '/blog/': [
        {
          text: 'Latest Posts',
          items: [
            { text: 'All Posts', link: '/blog/' },
            { text: 'Technical SEO', link: '/blog/category/technical' },
            { text: 'Tools & Scripts', link: '/blog/category/tools' },
            { text: 'Case Studies', link: '/blog/category/case-studies' }
          ]
        }
      ],
      '/tools/': [
        {
          text: 'SEO Tools',
          items: [
            { text: 'All Tools', link: '/tools/' },
            { text: 'Google Discover Emulator', link: '/tools/google-discover-emulator' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dsottimano/opensourceseo' }
    ],

    footer: {
      message: 'Open source SEO knowledge for the community',
      copyright: 'Copyright © 2024 OpenSourceSEO'
    }
  },
  
  head: [
    // Favicon and app icons
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],
    
    // Meta tags
    ['meta', { name: 'author', content: 'David Sottimano' }],
    ['meta', { name: 'keywords', content: 'SEO, technical SEO, open source, tools, guides, optimization' }],
    
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'OpenSourceSEO' }],
    ['meta', { property: 'og:image', content: '/logo.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:creator', content: '@dsottimano' }],
    ['meta', { name: 'twitter:image', content: '/logo.png' }]
  ]
})
