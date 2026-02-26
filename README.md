# System Status Dashboard

A premium, compact, and professional monitoring dashboard for your infrastructure. Designed with an emphasis on high density, muted Apple-inspired aesthetics, and real-time feedback.

![Dashboard Preview](https://img.shields.io/badge/UI-Premium--Compact-2c2c2e?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)

## ✨ Features

- **Premium Compact UI**: Designed to fit dozens of monitors on a single screen without scrolling. Refined typography and tight spacing.
- **Custom Icon System**: Support for per-system icons (Server, DB, Cloud, etc.) with precise optical alignment and generous spacing.
- **Professional Palette**: Muted, cohesive color tones providing distinct identity for each block without being overly "shiny."
- **Branded Experience**: Includes a custom **Transparent Pulse Favicon** for a professional browser presence.
- **Stable Real-time Feedback**: 
  - **Zero Layout Shifts**: Individual "Checking..." indicators use reserved space to prevent UI jumping during refreshes.
  - **Global Health UI**: Header includes a visual health timeline (dots) and overall system health percentage.
- **Privacy-First Config**: Monitoring targets are stored in a local `public/config.json`. This file is git-ignored for privacy.
- **Responsive & Lightweight**: Built with Vanilla CSS for maximum performance and fluid adaptation.

## Preview:
![Screenshot 2026-02-26 at 11 20 53 PM](https://github.com/user-attachments/assets/47f14637-50f9-4c9c-8846-2fbb8da7b894)


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

#### 🔧 Changing the Port

- **Development**: Run `npm run dev -- --port 5173 --host` (replacing `5173` with your desired port).
- **Production**: If using `serve`, run `npx serve -s dist -l 5173`.

### Configuration

Modify your monitoring list in `public/config.json`:

```json
[
  {
    "name": "Production API",
    "url": "https://api.example.com",
    "icon": "cloud",
    "description": "Main customer-facing gateway"
  },
  {
    "name": "Local Synology",
    "url": "http://192.168.1.100:5000",
    "link": "http://synology.local",
    "icon": "server",
    "description": "Network Attached Storage"
  }
]
```

#### 📋 Supported Icons
Use these keys in the `icon` field (case-insensitive):
`server`, `database`, `globe`, `cpu`, `shield`, `harddrive`, `link`, `terminal`, `cloud`, `zap`, `activity`, `monitor`.

> [!TIP]
> **Optional Redirects**: Use the `link` field to specify an alternative URL for the title hyperlink (e.g., a friendly hostname) while keeping `url` for the actual health check. The dashboard will automatically display the hostname from the `link` if provided.

> [!TIP]
> If the `icon` field is missing or invalid, the system defaults to the **Activity** pulse icon.

## 🔧 Deployment & Network

### Production Build
```bash
npm run build
npx serve -s dist
```

### Network Considerations
- **reachability-based Mode**: Uses browser-native fetching to "ping" services. This detects basic reachability (UP/DOWN) and latency. 
- **CORS Sensitivity**: Due to browser security, detailed HTTP error codes are often hidden; the dashboard relies on connection success/failure for status.

## 🛠 Tech Stack

- **React 18** / **TypeScript**
- **Framer Motion** (Smooth transitions & stabilized checking animations)
- **Lucide React** (Minimalist photography)
- **Vanilla CSS** (Custom high-density design system)
