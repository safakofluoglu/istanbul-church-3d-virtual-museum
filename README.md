# Istanbul Church – 3D Virtual Museum

An immersive 3D virtual museum experience exploring the architecture and history of a historic church in Istanbul, built with React, Three.js, and React Three Fiber. This project showcases architectural wonders through interactive panoramas and rich educational hotspots.

## ✨ Features

- **Immersive 360° Views**: Explore the interior of a historic church with high-resolution panoramic textures.
- **Interactive Hotspots**: Discover detailed information about specific architectural elements and artworks.
- **Educational Gallery**: A clean, responsive landing page to select different sections of the church and learn about their significance.
- **Artwork Details**: Accessible modals with rich descriptions and high-quality imagery focused on historical and artistic value.
- **Audio Narration**: Integrated audio support for an educational storytelling experience.
- **Modern UX**: Smooth transitions, loading states, and optimized 3D rendering.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **3D Engine**: Three.js, @react-three/fiber, @react-three/drei
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Audio**: Howler.js
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Architecture

- `src/components`: Reusable UI and 3D components (`PanoramaScene`, `Hotspot`, `ArtworkModal`).
- `src/pages`: Main application views (`Landing`, `SectionView`).
- `src/data`: Static data for church sections and educational hotspots.
- `src/hooks`: Custom React hooks for specialized logic.

## 🎨 Design System

- **Background**: Midnight Blue (`#0B132B`)
- **Primary CTA**: Antique Gold (`#D4AF37`)
- **Typography**: Modern, clean sans-serif for high readability.

## 📄 License

This project is for educational and portfolio purposes.
