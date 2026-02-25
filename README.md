#  System Status Dashboard

A premium, compact, and professional monitoring dashboard for your infrastructure. Designed with an emphasis on high density, muted Apple-inspired aesthetics, and real-time feedback.

![Dashboard Preview](https://img.shields.io/badge/UI-Premium--Compact-2c2c2e?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)

## ✨ Features

- **Premium Compact UI**: Designed to fit dozens of monitors on a single screen without scrolling. Refined typography and tight spacing for power users.
- **Professional Palette**: Muted, cohesive color tones that provide distinct visual identity for each block without being overly "shiny."
- **Real-time Status Feedback**: 
  - Individual **"Checking..."** indicators for each block during refreshes.
  - Global system health percentage in the header.
  - Visual health timeline (dots) in the header for a quick overview.
- **Privacy-First Config**: Monitoring targets are stored in a local `public/config.json`. This file is git-ignored to keep your internal URLs private.
- **Consolidated Layout**: All status information, including live update indicators, is unified in a minimalist top-level header.
- **Responsive & Lightweight**: Built with Vanilla CSS for maximum performance and fluid adaptation across devices.

## 🚀 Getting Started

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173).

### Configuration

Modify your monitoring list in `public/config.json`:

```json
[
  {
    "name": "Production API",
    "url": "https://api.example.com/v1/health",
    "description": "Main customer-facing gateway"
  },
  {
    "name": "Internal DB Cluster",
    "url": "http://10.0.0.15:8080/status",
    "description": "Read-only replica for analytics"
  }
]
```

> [!IMPORTANT]
> Since IDs are no longer required, the dashboard displays blocks in the order they appear in your JSON.

## 🔧 Deployment & Network

### Production Build
```bash
npm run build
npx serve -s dist
```

### Network Considerations
- **Custom Ports**: Full URL monitoring supported (e.g., `https://host:8443`).
- **Private Networks**: Works seamlessly over Tailscale, WireGuard, or local LAN as long as the machine hosting the dashboard has network access.
- **no-cors Mode**: Uses standard browser fetching to "ping" services. Note that this detects basic reachability (UP/DOWN) and latency, but cannot read detailed HTTP error codes due to CORS security.

## 🛠 Tech Stack

- **React 18** / **TypeScript**
- **Framer Motion** (Smooth transitions & checking animations)
- **Lucide React** (Minimalist iconography)
- **Vanilla CSS** (Custom high-density design system)
