/**
 * formatDate.js
 * Date / time helper utilities used across the app.
 */

/** Convert Unix timestamp + timezone offset to a Date object */
export const unixToLocalDate = (unix, offsetSecs = 0) =>
  new Date(unix * 1000 + offsetSecs * 1000);

/** "Mon", "Tue" … */
export const formatDay = (unix, offset = 0) =>
  unixToLocalDate(unix, offset).toLocaleDateString('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  });

/** "Mon, 12 Jul" */
export const formatShortDate = (unix, offset = 0) =>
  unixToLocalDate(unix, offset).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });

/** "06:30 AM" */
export const formatTime = (unix, offset = 0) =>
  unixToLocalDate(unix, offset).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });

/** "Sunday, July 12, 2026" */
export const formatFullDate = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/**
 * Group forecast list (3-hour intervals) into daily buckets.
 * Returns up to 5 future days with min/max temps & a representative entry.
 */
export const groupForecastByDay = (list = [], offset = 0) => {
  const grouped = {};

  list.forEach((item) => {
    const d   = unixToLocalDate(item.dt, offset);
    const key = d.toISOString().split('T')[0]; // "YYYY-MM-DD"
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  const todayKey = new Date().toISOString().split('T')[0];

  return Object.entries(grouped)
    .filter(([key]) => key !== todayKey)
    .slice(0, 5)
    .map(([key, items]) => ({
      date:           key,
      items,
      representative: items[Math.floor(items.length / 2)],
      minTemp:        Math.min(...items.map((i) => i.main.temp_min)),
      maxTemp:        Math.max(...items.map((i) => i.main.temp_max)),
    }));
};

/**
 * Map a weather condition ID to a CSS theme class.
 * Used to switch the app background based on current conditions.
 */
export const getWeatherTheme = (id, isDay = true) => {
  if (!id) return 'theme-default';
  if (id >= 200 && id < 300) return 'theme-thunderstorm';
  if (id >= 300 && id < 500) return 'theme-rain';
  if (id >= 500 && id < 600) return 'theme-rain';
  if (id >= 600 && id < 700) return 'theme-snow';
  if (id >= 700 && id < 800) return 'theme-mist';
  if (id === 800)             return isDay ? 'theme-clear-day' : 'theme-clear-night';
  if (id  >  800)             return 'theme-clouds';
  return 'theme-default';
};
