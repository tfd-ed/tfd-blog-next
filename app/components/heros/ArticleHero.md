# ArticleHero Component

A beautiful hero component with an auto-animating image stack on one side and a quote section on the other.

## Features

- ✨ Auto-animating image carousel with smooth fade transitions
- 🎯 Navigation dots for manual slide control
- 📱 Fully responsive design
- 🌓 Dark mode support
- ⚙️ Highly customizable props
- 🎨 Quote section with italic bold title and normal description
- 🔘 Optional CTA buttons

## Usage

### Basic Usage

```vue
<template>
  <ArticleHero />
</template>
```

### Custom Content with i18n

```vue
<template>
  <ArticleHero 
    :title="$t('articles_hero_title')"
    :description="$t('articles_hero_description')"
    :author="$t('articles_hero_author')"
    :authorTitle="$t('articles_hero_author_title')"
    :interval="5000"
    :showCTA="true"
  />
</template>
```

### Custom Images and Content

```vue
<template>
  <ArticleHero 
    title="Your Custom Title"
    description="Your custom description text here"
    author="Author Name"
    authorTitle="Position"
    :images="customImages"
    :interval="3000"
    :showCTA="false"
  />
</template>

<script setup>
const customImages = [
  {
    src: '/images/slide1.jpg',
    alt: 'Description 1'
  },
  {
    src: '/images/slide2.jpg',
    alt: 'Description 2'
  },
  {
    src: '/images/slide3.jpg',
    alt: 'Description 3'
  }
]
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | String | 'Empowering Education Through Innovation' | Main heading text (displayed in italic bold) |
| `description` | String | 'Transform your learning journey...' | Description text (normal weight) |
| `author` | String | 'John Doe' | Author name |
| `authorTitle` | String | 'CEO & Founder' | Author's title/position |
| `images` | Array | [4 default images] | Array of image objects with `src` and `alt` properties |
| `interval` | Number | 4000 | Time in milliseconds between automatic slide transitions |
| `showCTA` | Boolean | true | Whether to show the CTA buttons |

## Image Object Structure

```typescript
interface Image {
  src: string   // Image URL or path
  alt: string   // Alternative text for accessibility
}
```

## Styling

The component uses:
- Tailwind CSS utility classes
- Custom `bg-tfd` color (defined in your Tailwind config)
- Smooth fade transitions
- Responsive breakpoints (mobile, tablet, desktop)

## Features in Detail

### Auto-Animation
- Images automatically transition every `interval` milliseconds
- Smooth fade-in/fade-out effect
- Automatically loops back to the first image

### Manual Navigation
- Click on navigation dots to jump to specific slides
- Clicking a dot resets the auto-animation timer

### Dark Mode
- Automatically adapts to light/dark mode
- Gradient overlays adjust for better readability

### Responsive Design
- Mobile: Stacked layout (quote on top, images below)
- Desktop: Side-by-side layout
- Adaptive spacing and typography

## Example Use Cases

1. **Article Landing Page** - Showcase featured articles with compelling quotes
2. **About Page** - Display team photos with mission statement
3. **Product Hero** - Show product images with value proposition
4. **Testimonial Section** - Feature customer photos with their quotes

## Customization Tips

### Change Animation Speed
```vue
<ArticleHero :interval="6000" /> <!-- Slower: 6 seconds -->
<ArticleHero :interval="2000" /> <!-- Faster: 2 seconds -->
```

### Hide CTA Buttons
```vue
<ArticleHero :showCTA="false" />
```

### Use Local Images
```vue
<ArticleHero :images="[
  { src: '/images/hero1.jpg', alt: 'Hero 1' },
  { src: '/images/hero2.jpg', alt: 'Hero 2' }
]" />
```

### Use with NuxtImg
For better image optimization, you can use NuxtImg in your custom images.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Supports CSS Grid and Flexbox
- Requires JavaScript for auto-animation

## Accessibility

- Alt text for all images
- Semantic HTML structure
- ARIA labels for navigation buttons
- Keyboard navigation support
- Screen reader friendly

## Performance

- Lazy loading images (when using NuxtImg)
- Efficient transitions with CSS
- Cleans up intervals on component unmount
- Minimal re-renders
