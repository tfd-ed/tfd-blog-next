# Playrooms - AI Model Playground

## Overview
The Playrooms section provides an interactive space for users to explore and experiment with various AI models and technologies.

## Structure

### Main Page (`/playrooms`)
Located at: `app/pages/playrooms.vue`

Displays a grid of AI model cards with:
- Model name and description (i18n supported)
- Icon and optional badge
- Feature highlights
- Performance statistics
- Interactive buttons (available/coming soon states)

### Individual Model Pages
Located at: `app/pages/playrooms/[model-name].vue`

Currently implemented:
- `/playrooms/object-detection` - Real-time object detection demo
- `/playrooms/document-qa` - Document Q&A interface

## AI Models Available

1. **Object Detection** 🎯
   - Real-time object recognition
   - Multiple object tracking
   - Custom model training
   - Status: Available

2. **Document Q&A** 📄
   - Instant answers from PDFs
   - Context-aware responses
   - Multi-document support
   - Status: Available

3. **Text Summarization** 📝
   - Intelligent text condensing
   - Key point extraction
   - Multiple summary lengths
   - Status: Coming Soon

4. **Spam Detection** 🛡️
   - Email spam filtering
   - ML-based classification
   - Real-time analysis
   - Status: Coming Soon

5. **Reinforcement Learning** 🤖
   - Agent training simulation
   - Reward-based learning
   - Interactive environments
   - Status: Coming Soon

6. **Motion Tracking** 🎥
   - Real-time motion capture
   - Pose estimation
   - Activity recognition
   - Status: Coming Soon

## Components

### AIModelCard (`components/playrooms/AIModelCard.vue`)
Reusable component for displaying AI model information.

Props:
- `icon`: Emoji or icon representation
- `title`: Model name
- `description`: Brief description
- `badge`: Optional label (e.g., "Popular", "Advanced")
- `available`: Boolean for availability
- `features`: Array of feature strings
- `stats`: Array of performance metrics

## Internationalization

All content supports both English (`en`) and Khmer (`km`) translations.

Translation keys added:
- `od` / `od_description` - Object Detection
- `da` / `da_description` - Document Q&A
- `sum` / `sum_description` - Summarization
- `spam` / `spam_description` - Spam Detection
- `rl` / `rl_description` - Reinforcement Learning
- `motion_tracking` / `motion_tracking_description` - Motion Tracking
- `ai_portal` - AI Room
- `ai_room_description` - Main description

## Styling

Uses Tailwind CSS with:
- Dark mode support
- Responsive grid layout (1/2/3 columns)
- Hover effects and transitions
- Custom TFD brand color (`--color-tfd: #dc2626`)

## Future Enhancements

1. Add actual AI model implementations
2. Integrate real-time demos with webcam/file upload
3. Add user authentication for saving results
4. Implement model training interfaces
5. Add analytics and usage tracking
6. Create tutorial/documentation pages for each model

## Development

To add a new AI model:

1. Add translation keys to `i18n/locales/en.json` and `km.json`
2. Add model configuration to `aiModels` array in `playrooms.vue`
3. Create a new page at `app/pages/playrooms/[model-name].vue`
4. Implement the actual AI functionality

## Dependencies

- Nuxt 3
- @nuxt/ui
- @nuxtjs/i18n
- Tailwind CSS
