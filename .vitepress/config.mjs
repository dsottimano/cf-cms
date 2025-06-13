import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CF-CMS",
  description: "A modern, fast, and SEO-friendly content management system",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: {
      '/blog/': [
        {
          text: 'Blog Posts',
          items: [
            { text: 'Welcome to CF-CMS', link: '/blog/welcome-to-cf-cms' },
            { text: 'Why Static Sites Matter for SEO', link: '/blog/static-sites-seo' },
            { text: 'Getting Started with VitePress', link: '/blog/getting-started-vitepress' }
          ]
        }
      ],
      '/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dsottimano/cf-cms' }
    ]
  }
})
