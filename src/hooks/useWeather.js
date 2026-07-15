/**
 * useWeather.js
 * Custom hook — encapsulates all weather-fetch logic, state, and side-effects.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from '../services/weatherApi';

const STORAGE_CITY    = 'wn_last_city';
const STORAGE_HISTORY = 'wn_history';
const STORAGE_UNIT    = 'wn_unit';
const STORAGE_THEME   = 'wn_theme';
const MAX_HISTORY     = 8;
const REFRESH_MS      = 10 * 60 * 1000; // 10 min

const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast,       setForecast]       = useState(null);
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState(null);

  const [unit, setUnit] = useState(
    () => localStorage.getItem(STORAGE_UNIT) || 'metric'
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_THEME) || 'dark'
  );
  const [searchHistory, setSearchHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_HISTORY)) || []; }
    catch { return []; }
  });
  const [activeCity, setActiveCity] = useState(
    () => localStorage.getItem(STORAGE_CITY) || ''
  );

  const timerRef = useRef(null);

  // ── History helpers ────────────────────────────────────────────────────────
  const saveHistory = (arr) => {
    setSearchHistory(arr);
    localStorage.setItem(STORAGE_HISTORY, JSON.stringify(arr));
  };

  const pushHistory = (city) => {
    const norm    = city.trim();
    const cleaned = searchHistory.filter(
      (c) => c.toLowerCase() !== norm.toLowerCase()
    );
    saveHistory([norm, ...cleaned].slice(0, MAX_HISTORY));
  };

  const clearHistory = () => saveHistory([]);

  // ── Fetch by city name ─────────────────────────────────────────────────────
  const fetchWeather = useCallback(
    async (city, selectedUnit = unit) => {
      if (!city?.trim()) return;
      setLoading(true);
      setError(null);
      try {
        const [w, f] = await Promise.all([
          fetchCurrentWeather(city.trim(), selectedUnit),
          fetchForecast(city.trim(), selectedUnit),
        ]);
        setCurrentWeather(w);
        setForecast(f);
        setActiveCity(city.trim());
        localStorage.setItem(STORAGE_CITY, city.trim());
        pushHistory(city.trim());
      } catch (e) {
        setError(e.message);
        setCurrentWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [unit]
  );

  // ── Fetch by Geolocation ───────────────────────────────────────────────────
  const fetchWeatherByLocation = useCallback(
    async (selectedUnit = unit) => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        return;
      }
      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude: lat, longitude: lon } }) => {
          try {
            const [w, f] = await Promise.all([
              fetchWeatherByCoords(lat, lon, selectedUnit),
              fetchForecastByCoords(lat, lon, selectedUnit),
            ]);
            setCurrentWeather(w);
            setForecast(f);
            setActiveCity(w.name);
            localStorage.setItem(STORAGE_CITY, w.name);
            pushHistory(w.name);
          } catch (e) {
            setError(e.message);
          } finally {
            setLoading(false);
          }
        },
        (geoErr) => {
          setLoading(false);
          const msgs = {
            1: 'Location access denied. Please allow location permission or search by city.',
            2: 'Location unavailable. Please try searching by city name.',
            3: 'Location request timed out. Please try again.',
          };
          setError(msgs[geoErr.code] || 'Could not get your location.');
        },
        { timeout: 10000 }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [unit]
  );

  // ── Unit toggle ────────────────────────────────────────────────────────────
  const toggleUnit = useCallback(() => {
    const next = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(next);
    localStorage.setItem(STORAGE_UNIT, next);
    if (activeCity) fetchWeather(activeCity, next);
  }, [unit, activeCity, fetchWeather]);

  // ── Theme toggle ───────────────────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_THEME, next);
      return next;
    });
  }, []);

  // ── Auto-refresh every 10 min ──────────────────────────────────────────────
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (activeCity) {
      timerRef.current = setInterval(() => fetchWeather(activeCity, unit), REFRESH_MS);
    }
    return () => clearInterval(timerRef.current);
  }, [activeCity, unit, fetchWeather]);

  // ── Load last searched city on mount ──────────────────────────────────────
  useEffect(() => {
    if (activeCity) fetchWeather(activeCity, unit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentWeather, forecast, loading, error,
    unit, theme, searchHistory, activeCity,
    fetchWeather, fetchWeatherByLocation,
    toggleUnit, toggleTheme, clearHistory,
  };
};

export default useWeather;
