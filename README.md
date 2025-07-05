# 🚀 StockGo - Modern IPO Tracker & Investment Platform

A beautiful, modern IPO tracking application built with React, TypeScript, and Tailwind CSS. Inspired by Groww's clean design philosophy, featuring real-time updates, interactive charts, and a comprehensive investment dashboard.

## 🌟 Live Demo

Experience StockGo live here:

👉 [ [https://zingy-puppy-a6a91a.netlify.app](https://zingy-puppy-a6a91a.netlify.app) ]

## ✨ Features

### Core Functionality

  * **Real-time IPO Tracking:** Live subscription updates for open IPOs with WebSocket simulation.
  * **Comprehensive Dashboard:** Overview of all IPOs with interactive metrics and charts.
  * **Detailed IPO Pages:** Complete information including financials, subscription data, and company details.
  * **Status-based Navigation:** Separate pages for Live, Upcoming, and Past IPOs.
  * **Interactive Market Trends:** Dynamic charts with multiple data views (Subscription, GMP, Issue Size).
  * **Advanced Filtering:** Filter IPOs by status with real-time counters.

### Design & User Experience

  * **Groww-Inspired Interface:** Clean, modern design following Groww's design principles.
  * **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
  * **Smooth Animations:** Fade-in, slide-up, and hover effects for enhanced user experience.
  * **Live Data Indicators:** Pulse animations and real-time update notifications.
  * **Professional Color Scheme:** Green-focused palette with accent colors for different data types.

## 💻 Technology Stack

  * **Frontend Framework:** React 18.3.1, TypeScript, Vite
  * **Styling & UI:** Tailwind CSS 3.4.1, CSS Custom Properties, Inter Font
  * **Icons & Assets:** Lucide React 0.344.0, Pexels Stock Photos
  * **Routing & Navigation:** React Router DOM 7.6.3
  * **Development Tools:** ESLint, TypeScript ESLint, PostCSS
  * **Build & Deployment:** Vite Build System, ES Modules, Tree Shaking

## 🏗️ Project Architecture

The project follows a component-based architecture with clear separation of concerns, ensuring modularity and reusability.

```
src/
├── App.tsx                    # Main application with routing
├── App.css                    # Global styles and design system
├── components/                # Reusable UI components
│   ├── Dashboard.tsx
│   ├── IPOCard.tsx
│   ├── IPODetails.tsx
│   ├── Navbar.tsx
│   ├── MetricCard.tsx
│   ├── InteractiveChart.tsx
│   ├── LiveIPOs.tsx
│   ├── UpcomingIPOs.tsx
│   └── PastIPOs.tsx
├── data/
│   └── mockData.ts            # Comprehensive mock IPO data
├── types/
│   └── index.ts               # TypeScript type definitions
└── main.tsx                   # Application entry point
```

## 🎯 Key Features Breakdown

  * **Real-time Updates:** Simulated WebSocket connections for live data with visual indicators and smooth chart transitions.
  * **Interactive Charts:** Canvas-based rendering, multiple chart types, hover effects with tooltips, and responsive design.
  * **Responsive Design:** Mobile-first approach with flexible grid layouts and touch-friendly elements across breakpoints.
  * **Performance Optimizations:** Efficient React rendering, CSS animations, and optimized assets for smooth performance.

## 🌐 API Integration Ready

The application is structured for easy integration with real APIs.
