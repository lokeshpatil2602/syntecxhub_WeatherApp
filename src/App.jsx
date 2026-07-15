/**
 * App.jsx
 * Root component — orchestrates layout, theme, and weather state.
 */
import { useEffect } from 'react';
import useWeather from './hooks/useWeather';
import { getWeatherTheme } from './utils/formatDate';
import SearchBar      from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast       from './components/Forecast';
import Loader         from './components/Loader';
import ErrorMessage   from './components/ErrorMessage';
import './App.css';

const App = () => {
  const {
    currentWeather, forecast, loading, error,
    unit, theme, searchHistory, activeCity,
    fetchWeather, fetchWeatherByLocation,
    toggleUnit, toggleTheme, clearHistory,
  } = useWeather();

  // ── Dynamic background theme based on weather condition ──────────────────
  const weatherTheme = currentWeather
    ? getWeatherTheme(
        currentWeather.weather[0].id,
        currentWeather.dt > currentWeather.sys.sunrise &&
        currentWeather.dt < currentWeather.sys.sunset
      )
    : 'theme-default';

  // ── Apply theme + weather class to <body> ─────────────────────────────────
  useEffect(() => {
    document.body.className = `${theme} ${weatherTheme}`;
  }, [theme, weatherTheme]);

  return (
    <div className={`app ${theme}`} aria-label="WeatherNow application">

      {/* ── Top navigation bar ── */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
          <span className="nav-title">WeatherNow</span>
        </div>

        <div className="nav-controls">
          {/* Unit toggle */}
          <button
            className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
            onClick={toggleUnit}
            aria-label={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
            title="Toggle temperature unit"
          >
            °C / °F
          </button>

          {/* Theme toggle */}
          <button
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              /* Moon icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="main-content">

        {/* Search */}
        <div className="search-section">
          <SearchBar
            onSearch={fetchWeather}
            onLocationSearch={fetchWeatherByLocation}
            searchHistory={searchHistory}
            onClearHistory={clearHistory}
            loading={loading}
          />
        </div>

        {/* Welcome state */}
        {!loading && !error && !currentWeather && (
          <div className="welcome">
            <div className="welcome-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
            </div>
            <h2 className="welcome-title">Welcome to WeatherNow</h2>
            <p className="welcome-subtitle">
              Search for any city or use your current location to get live weather forecasts.
            </p>
            <div className="welcome-tips">
              <span>🔍 Search by city name</span>
              <span>📍 Use GPS location</span>
              <span>🌡️ Toggle °C / °F</span>
              <span>🌙 Dark / Light mode</span>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && <Loader />}

        {/* Error */}
        {!loading && error && (
          <ErrorMessage
            message={error}
            onRetry={activeCity ? () => fetchWeather(activeCity) : undefined}
          />
        )}

        {/* Weather data */}
        {!loading && !error && currentWeather && (
          <div className="weather-content">
            <CurrentWeather data={currentWeather} unit={unit} />
            <Forecast data={forecast} unit={unit} />

            {/* Last updated */}
            <p className="last-updated" aria-live="polite">
              Last updated: {new Date(currentWeather.dt * 1000).toLocaleTimeString()}
              &nbsp;· Auto-refreshes every 10 min
            </p>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="footer" role="contentinfo">
        <p>
          Data provided by{' '}
          <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">
            OpenWeatherMap
          </a>
          &nbsp;· Built with React
        </p>
      </footer>
    </div>
  );
};

export default App;
