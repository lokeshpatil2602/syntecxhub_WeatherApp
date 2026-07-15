/**
 * weatherApi.js
 * Centralised API layer for OpenWeatherMap calls.
 * All endpoints live here — the rest of the app never touches raw URLs.
 */
import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL  = 'https://api.openweathermap.org/geo/1.0';
const API_KEY  = import.meta.env.VITE_WEATHER_API_KEY;

/** Reusable axios instance with shared defaults */
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: { appid: API_KEY },
});

// Normalise all API errors into friendly messages
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      const { status, data } = err.response;
      if (status === 401) throw new Error('Invalid API key. Please check your VITE_WEATHER_API_KEY in .env');
      if (status === 404) throw new Error('City not found. Please try a different city name.');
      if (status === 429) throw new Error('API rate limit exceeded. Please try again in a moment.');
      throw new Error(data?.message || `API error (${status})`);
    }
    if (err.request) throw new Error('Network error. Please check your internet connection.');
    throw new Error('Something went wrong. Please try again.');
  }
);

/** Current weather by city name */
export const fetchCurrentWeather = async (city, units = 'metric') => {
  const { data } = await api.get('/weather', { params: { q: city, units } });
  return data;
};

/** Current weather by coordinates */
export const fetchWeatherByCoords = async (lat, lon, units = 'metric') => {
  const { data } = await api.get('/weather', { params: { lat, lon, units } });
  return data;
};

/** 5-day / 3-hour forecast by city name */
export const fetchForecast = async (city, units = 'metric') => {
  const { data } = await api.get('/forecast', { params: { q: city, units } });
  return data;
};

/** 5-day / 3-hour forecast by coordinates */
export const fetchForecastByCoords = async (lat, lon, units = 'metric') => {
  const { data } = await api.get('/forecast', { params: { lat, lon, units } });
  return data;
};
