# 🌤️ WeatherNow — Modern React Weather App

A fully responsive, production-ready weather forecast application built with React 19 + Vite.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Current Weather** | Temperature, condition, icon, feels like, humidity, wind, pressure, visibility, sunrise & sunset |
| **5-Day Forecast** | Daily min/max temps, weather icon, description |
| **Search** | City name search with Enter-key support |
| **Recent History** | Last 8 cities stored in localStorage |
| **Geolocation** | One-click "use my location" via browser GPS |
| **Dark / Light mode** | Toggle with preference saved to localStorage |
| **°C / °F toggle** | Unit preference saved and re-fetched automatically |
| **Auto-refresh** | Data refreshes every 10 minutes |
| **Dynamic backgrounds** | App background changes with weather conditions |
| **Skeleton loading** | Animated skeleton cards + spinner while fetching |
| **Error handling** | Friendly messages for invalid city, network errors, API failures |
| **Responsive** | Mobile (360px) → tablet → desktop (1100px) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx        # Search input, history dropdown, GPS button
│   ├── CurrentWeather.jsx   # Main weather display
│   ├── Forecast.jsx         # 5-day forecast wrapper
│   ├── ForecastCard.jsx     # Single forecast day card
│   ├── WeatherCard.jsx      # Reusable stat card (humidity, wind, etc.)
│   ├── Loader.jsx           # Spinner + skeleton loading
│   └── ErrorMessage.jsx     # Error display with retry
├── services/
│   └── weatherApi.js        # All OpenWeatherMap API calls
├── hooks/
│   └── useWeather.js        # Central weather state & logic hook
├── utils/
│   └── formatDate.js        # Date/time helpers & weather theme mapper
├── App.jsx                  # Root component
├── App.css                  # All component styles
├── index.css                # Global reset + weather theme backgrounds
└── main.jsx                 # React entry point
```

---

## 🚀 Quick Start

### 1. Clone / navigate to the project

```bash
cd weather-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

Get a **free** API key from [openweathermap.org/api](https://openweathermap.org/api).

Create (or edit) the `.env` file in the project root:

```env
VITE_WEATHER_API_KEY=your_actual_api_key_here
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🔑 API Setup Guide

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Create a free account
3. Navigate to **API Keys** in your dashboard
4. Copy your default key (or generate a new one)
5. Paste it into `.env` as `VITE_WEATHER_API_KEY=<your_key>`
6. **Note:** New keys take up to 2 hours to activate

### APIs used

| Endpoint | Purpose |
|---|---|
| `/data/2.5/weather` | Current weather by city or coordinates |
| `/data/2.5/forecast` | 5-day / 3-hour forecast |

---

## 🌈 Weather Background Themes

The app dynamically switches its background gradient based on the current condition:

| Condition | Theme |
|---|---|
| Clear sky (day) | Blue-sky gradient |
| Clear sky (night) | Deep navy / midnight blue |
| Clouds | Grey-slate gradient |
| Rain / Drizzle | Dark navy-blue |
| Thunderstorm | Very dark navy |
| Snow | Soft white-grey |
| Mist / Fog / Haze | Muted blue-grey |

---

## 🛠️ Tech Stack

- **React 19** + **Vite 8**
- **Axios** for HTTP
- **OpenWeatherMap API** (free tier)
- Pure **CSS** (no frameworks) — glass-morphism, gradients, animations
- **Inter** font (Google Fonts)

---

## 📄 License

MIT — free to use and modify.
