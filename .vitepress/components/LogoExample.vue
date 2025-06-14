<template>
  <div class="logo-examples">
    <h3>Logo Usage Examples</h3>
    
    <!-- Basic logo usage -->
    <div class="example-section">
      <h4>Basic Logo</h4>
      <img src="/logo.png" alt="OpenSourceSEO" class="basic-logo" />
    </div>
    
    <!-- Logo with different sizes -->
    <div class="example-section">
      <h4>Different Sizes</h4>
      <img src="/logo.png" alt="OpenSourceSEO" class="logo-small" />
      <img src="/logo.png" alt="OpenSourceSEO" class="logo-medium" />
      <img src="/logo.png" alt="OpenSourceSEO" class="logo-large" />
    </div>
    
    <!-- Logo in a card -->
    <div class="example-section">
      <h4>Logo in Card</h4>
      <div class="logo-card">
        <img src="/logo.png" alt="OpenSourceSEO" class="card-logo" />
        <div class="card-content">
          <h5>OpenSourceSEO</h5>
          <p>Technical SEO Knowledge Hub</p>
        </div>
      </div>
    </div>
    
    <!-- Responsive logo -->
    <div class="example-section">
      <h4>Responsive Logo</h4>
      <picture class="responsive-logo">
        <source media="(max-width: 768px)" srcset="/logo.png">
        <source media="(min-width: 769px)" srcset="/logo.png">
        <img src="/logo.png" alt="OpenSourceSEO" />
      </picture>
    </div>
  </div>
</template>

<style scoped>
.logo-examples {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.example-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
}

.example-section h4 {
  margin-top: 0;
  color: #1a73e8;
}

/* Basic logo styles */
.basic-logo {
  max-width: 200px;
  height: auto;
}

/* Different sizes */
.logo-small {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

.logo-medium {
  width: 100px;
  height: auto;
  margin-right: 10px;
}

.logo-large {
  width: 200px;
  height: auto;
}

/* Logo card */
.logo-card {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
}

.card-logo {
  width: 60px;
  height: auto;
  margin-right: 15px;
  flex-shrink: 0;
}

.card-content h5 {
  margin: 0 0 5px 0;
  color: #333;
}

.card-content p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

/* Responsive logo */
.responsive-logo {
  display: block;
}

.responsive-logo img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .logo-card {
    flex-direction: column;
    text-align: center;
  }
  
  .card-logo {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style> 