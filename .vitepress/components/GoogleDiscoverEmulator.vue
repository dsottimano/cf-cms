<template>
  <div class="discover-emulator">
    <div class="discover-header">
      <h2>🔍 Google Discover Emulator</h2>
      <p>Test how your articles might appear in Google Discover feed</p>
    </div>

    <!-- Article Input Form -->
    <div class="article-form">
      <h3>Article Details</h3>
      <div class="form-group">
        <label>Article Title</label>
        <input 
          v-model="article.title" 
          type="text" 
          placeholder="Enter your article title..."
          maxlength="60"
        />
        <span class="char-count" :class="{ warning: article.title.length > 50 }">
          {{ article.title.length }}/60
        </span>
      </div>

      <div class="form-group">
        <label>Meta Description</label>
        <textarea 
          v-model="article.description" 
          placeholder="Enter meta description..."
          maxlength="160"
        ></textarea>
        <span class="char-count" :class="{ warning: article.description.length > 140 }">
          {{ article.description.length }}/160
        </span>
      </div>

      <div class="form-group">
        <label>Featured Image URL</label>
        <input 
          v-model="article.image" 
          type="url" 
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div class="form-group">
        <label>Article URL</label>
        <input 
          v-model="article.url" 
          type="url" 
          placeholder="https://example.com/article"
        />
      </div>

      <div class="form-group">
        <label>Site Name</label>
        <input 
          v-model="article.siteName" 
          type="text" 
          placeholder="Your Site Name"
        />
      </div>

      <div class="form-group">
        <label>Published Date</label>
        <input 
          v-model="article.publishedDate" 
          type="date"
        />
      </div>
    </div>

    <!-- Discover Feed Preview -->
    <div class="discover-preview">
      <h3>Discover Feed Preview</h3>
      
      <!-- Mobile View -->
      <div class="device-preview mobile">
        <div class="device-frame">
          <div class="discover-feed">
            <div class="discover-card" @click="openArticle">
              <div class="card-image">
                <img 
                  :src="article.image || placeholderImage" 
                  :alt="article.title"
                  @error="handleImageError"
                />
                <div class="image-overlay">
                  <span class="site-name">{{ article.siteName || 'Your Site' }}</span>
                </div>
              </div>
              
              <div class="card-content">
                <h4 class="card-title">{{ article.title || 'Your Article Title' }}</h4>
                <p class="card-description">{{ truncatedDescription }}</p>
                <div class="card-meta">
                  <span class="publish-date">{{ formattedDate }}</span>
                  <button class="more-options">⋯</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop View -->
      <div class="device-preview desktop">
        <div class="device-frame">
          <div class="discover-feed-desktop">
            <div class="discover-card-desktop" @click="openArticle">
              <div class="card-image-desktop">
                <img 
                  :src="article.image || placeholderImage" 
                  :alt="article.title"
                  @error="handleImageError"
                />
              </div>
              
              <div class="card-content-desktop">
                <div class="site-info">
                  <span class="site-name">{{ article.siteName || 'Your Site' }}</span>
                  <span class="publish-date">{{ formattedDate }}</span>
                </div>
                <h4 class="card-title">{{ article.title || 'Your Article Title' }}</h4>
                <p class="card-description">{{ truncatedDescription }}</p>
              </div>
              
              <button class="more-options-desktop">⋯</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SEO Analysis -->
    <div class="seo-analysis">
      <h3>SEO Analysis</h3>
      <div class="analysis-grid">
        <div class="analysis-item" :class="titleScore.status">
          <h4>Title Optimization</h4>
          <div class="score">{{ titleScore.score }}/100</div>
          <p>{{ titleScore.feedback }}</p>
        </div>

        <div class="analysis-item" :class="descriptionScore.status">
          <h4>Description Optimization</h4>
          <div class="score">{{ descriptionScore.score }}/100</div>
          <p>{{ descriptionScore.feedback }}</p>
        </div>

        <div class="analysis-item" :class="imageScore.status">
          <h4>Image Optimization</h4>
          <div class="score">{{ imageScore.score }}/100</div>
          <p>{{ imageScore.feedback }}</p>
        </div>

        <div class="analysis-item" :class="urlScore.status">
          <h4>URL Structure</h4>
          <div class="score">{{ urlScore.score }}/100</div>
          <p>{{ urlScore.feedback }}</p>
        </div>
      </div>
    </div>

    <!-- Export Options -->
    <div class="export-options">
      <h3>Export & Share</h3>
      <div class="export-buttons">
        <button @click="exportAsImage" class="export-btn">📸 Export as Image</button>
        <button @click="copyShareableLink" class="export-btn">🔗 Copy Shareable Link</button>
        <button @click="exportAsJSON" class="export-btn">📄 Export as JSON</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const article = ref({
  title: '',
  description: '',
  image: '',
  url: '',
  siteName: '',
  publishedDate: new Date().toISOString().split('T')[0]
})

const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZlYXR1cmVkIEltYWdlPC90ZXh0Pjwvc3ZnPg=='

// Computed properties
const truncatedDescription = computed(() => {
  const desc = article.value.description || 'Your article description will appear here...'
  return desc.length > 120 ? desc.substring(0, 120) + '...' : desc
})

const formattedDate = computed(() => {
  if (!article.value.publishedDate) return 'Today'
  const date = new Date(article.value.publishedDate)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  return date.toLocaleDateString()
})

// SEO Analysis
const titleScore = computed(() => {
  const title = article.value.title
  if (!title) return { score: 0, status: 'poor', feedback: 'Title is required' }
  
  let score = 50
  let feedback = []
  
  if (title.length >= 30 && title.length <= 60) score += 30
  else if (title.length < 30) feedback.push('Title too short')
  else feedback.push('Title too long')
  
  if (/[0-9]/.test(title)) score += 10
  if (/[!?]/.test(title)) score += 10
  
  const status = score >= 80 ? 'good' : score >= 60 ? 'okay' : 'poor'
  const finalFeedback = feedback.length ? feedback.join(', ') : 'Title looks good!'
  
  return { score, status, feedback: finalFeedback }
})

const descriptionScore = computed(() => {
  const desc = article.value.description
  if (!desc) return { score: 0, status: 'poor', feedback: 'Description is required' }
  
  let score = 50
  let feedback = []
  
  if (desc.length >= 120 && desc.length <= 160) score += 40
  else if (desc.length < 120) feedback.push('Description too short')
  else feedback.push('Description too long')
  
  if (desc.includes(article.value.title.split(' ')[0])) score += 10
  
  const status = score >= 80 ? 'good' : score >= 60 ? 'okay' : 'poor'
  const finalFeedback = feedback.length ? feedback.join(', ') : 'Description looks good!'
  
  return { score, status, feedback: finalFeedback }
})

const imageScore = computed(() => {
  const image = article.value.image
  if (!image) return { score: 0, status: 'poor', feedback: 'Featured image is required' }
  
  let score = 70
  let feedback = []
  
  if (image.includes('.webp')) score += 15
  else if (image.includes('.jpg') || image.includes('.jpeg')) score += 10
  else if (image.includes('.png')) score += 5
  
  if (image.includes('1200x630') || image.includes('1920x1080')) score += 15
  
  const status = score >= 80 ? 'good' : score >= 60 ? 'okay' : 'poor'
  const finalFeedback = feedback.length ? feedback.join(', ') : 'Image looks good!'
  
  return { score, status, feedback: finalFeedback }
})

const urlScore = computed(() => {
  const url = article.value.url
  if (!url) return { score: 0, status: 'poor', feedback: 'URL is required' }
  
  let score = 50
  let feedback = []
  
  if (url.startsWith('https://')) score += 20
  if (url.length < 100) score += 15
  if (!url.includes('?')) score += 15
  
  const status = score >= 80 ? 'good' : score >= 60 ? 'okay' : 'poor'
  const finalFeedback = feedback.length ? feedback.join(', ') : 'URL structure looks good!'
  
  return { score, status, feedback: finalFeedback }
})

// Methods
const handleImageError = (event) => {
  event.target.src = placeholderImage
}

const openArticle = () => {
  if (article.value.url) {
    window.open(article.value.url, '_blank')
  }
}

const exportAsImage = () => {
  // Implementation for exporting as image
  alert('Export as image functionality would be implemented here')
}

const copyShareableLink = () => {
  const params = new URLSearchParams(article.value).toString()
  const shareableLink = `${window.location.origin}${window.location.pathname}?${params}`
  navigator.clipboard.writeText(shareableLink)
  alert('Shareable link copied to clipboard!')
}

const exportAsJSON = () => {
  const dataStr = JSON.stringify(article.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'discover-article.json'
  link.click()
}

// Load from URL parameters on mount
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  Object.keys(article.value).forEach(key => {
    if (params.has(key)) {
      article.value[key] = params.get(key)
    }
  })
})
</script>

<style scoped>
.discover-emulator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.discover-header {
  text-align: center;
  margin-bottom: 30px;
}

.discover-header h2 {
  color: #1a73e8;
  margin-bottom: 10px;
}

.article-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.char-count {
  font-size: 12px;
  color: #666;
  float: right;
  margin-top: 5px;
}

.char-count.warning {
  color: #ea4335;
}

.discover-preview {
  margin-bottom: 30px;
}

.device-preview {
  display: inline-block;
  margin: 0 20px 20px 0;
  vertical-align: top;
}

.mobile .device-frame {
  width: 375px;
  background: #000;
  border-radius: 25px;
  padding: 20px 10px;
}

.desktop .device-frame {
  width: 600px;
  background: #f1f3f4;
  border-radius: 8px;
  padding: 20px;
}

.discover-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.discover-card:hover {
  transform: translateY(-2px);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  padding: 20px 15px 15px;
}

.site-name {
  color: white;
  font-size: 12px;
  font-weight: 500;
}

.card-content {
  padding: 15px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 8px 0;
  color: #202124;
}

.card-description {
  font-size: 14px;
  color: #5f6368;
  line-height: 1.4;
  margin: 0 0 12px 0;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.publish-date {
  font-size: 12px;
  color: #5f6368;
}

.more-options {
  background: none;
  border: none;
  font-size: 16px;
  color: #5f6368;
  cursor: pointer;
  padding: 5px;
}

/* Desktop styles */
.discover-card-desktop {
  display: flex;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.discover-card-desktop:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.card-image-desktop {
  width: 200px;
  height: 120px;
  flex-shrink: 0;
}

.card-image-desktop img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content-desktop {
  flex: 1;
  padding: 15px;
}

.site-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.site-info .site-name {
  font-size: 12px;
  color: #1a73e8;
  font-weight: 500;
}

.site-info .publish-date {
  font-size: 12px;
  color: #5f6368;
}

.more-options-desktop {
  background: none;
  border: none;
  font-size: 16px;
  color: #5f6368;
  cursor: pointer;
  padding: 15px;
  align-self: flex-start;
}

.seo-analysis {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.analysis-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #ddd;
}

.analysis-item.good {
  border-left-color: #34a853;
}

.analysis-item.okay {
  border-left-color: #fbbc04;
}

.analysis-item.poor {
  border-left-color: #ea4335;
}

.analysis-item h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.score {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.good .score {
  color: #34a853;
}

.okay .score {
  color: #fbbc04;
}

.poor .score {
  color: #ea4335;
}

.export-options {
  text-align: center;
}

.export-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.export-btn {
  background: #1a73e8;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.export-btn:hover {
  background: #1557b0;
}

@media (max-width: 768px) {
  .device-preview {
    display: block;
    margin: 0 0 20px 0;
  }
  
  .mobile .device-frame,
  .desktop .device-frame {
    width: 100%;
    max-width: 400px;
  }
  
  .analysis-grid {
    grid-template-columns: 1fr;
  }
  
  .export-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style> 