/**
 * CurrentWeather.jsx
 * Main weather display — city info, temperature, condition, and stat cards.
 */
import { formatTime, formatFullDate } from '../utils/formatDate';
import WeatherCard from './WeatherCard';

const CurrentWeather = ({ data, unit }) => {
  if (!data) return null;

  const {
    name, sys, main, weather, wind,
    visibility, timezone,
  } = data;

  const sym       = unit === 'imperial' ? '°F' : '°C';
  const windUnit  = unit === 'imperial' ? 'mph' : 'm/s';
  const condition = weather[0];
  const isDay     = data.dt > sys.sunrise && data.dt < sys.sunset;

  // Visibility: API returns metres — convert to km
  const visKm = visibility ? (visibility / 1000).toFixed(1) : 'N/A';

  // Wind direction compass
  const windDir = (deg) => {
    const dirs = ['N','NE','E','SE','S','SW','W','NW'];
    return dirs[Math.round(deg / 45) % 8];
  };

  return (
    <section className="current-weather" aria-label="Current weather">
      {/* ── Header ── */}
      <div className="cw-header">
        <div className="cw-location">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h1 className="cw-city">{name}, {sys.country}</h1>
        </div>
        <p className="cw-date">{formatFullDate()}</p>
      </div>

      {/* ── Main temp block ── */}
      <div className="cw-main">
        <div className="cw-icon-wrap">
          <img
            className="cw-icon"
            src={`https://openweathermap.org/img/wn/${condition.icon}@4x.png`}
            alt={condition.description}
            width="120"
            height="120"
          />
          {isDay
            ? <span className="cw-daytime-badge">Day</span>
            : <span className="cw-daytime-badge night">Night</span>}
        </div>

        <div className="cw-temp-block">
          <div className="cw-temp" aria-label={`Temperature: ${Math.round(main.temp)}${sym}`}>
            {Math.round(main.temp)}
            <span className="cw-sym">{sym}</span>
          </div>
          <p className="cw-condition">{condition.description}</p>
          <p className="cw-feels">Feels like {Math.round(main.feels_like)}{sym}</p>
          <div className="cw-range">
            <span className="cw-high">↑ {Math.round(main.temp_max)}{sym}</span>
            <span className="cw-low">↓ {Math.round(main.temp_min)}{sym}</span>
          </div>
        </div>
      </div>

      {/* ── Stat cards grid ── */}
      <div className="cw-stats" role="list" aria-label="Weather details">
        <WeatherCard
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20" /><path d="M17 7A5 5 0 0 0 7 7" />
            </svg>
          }
          label="Humidity"
          value={main.humidity}
          unit="%"
          extra={main.humidity > 70 ? 'High' : main.humidity < 30 ? 'Low' : 'Comfortable'}
        />

        <WeatherCard
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
          }
          label="Wind Speed"
          value={wind.speed}
          unit={` ${windUnit}`}
          extra={wind.deg !== undefined ? `Direction: ${windDir(wind.deg)}` : undefined}
        />

        <WeatherCard
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
              <path d="M12 6v6l4 2" />
            </svg>
          }
          label="Pressure"
          value={main.pressure}
          unit=" hPa"
        />

        <WeatherCard
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          }
          label="Visibility"
          value={visKm}
          unit=" km"
        />

        <WeatherCard
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          }
          label="Sunrise"
          value={formatTime(sys.sunrise, timezone)}
        />

        <WeatherCard
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 18a5 5 0 0 0-10 0" />
              <line x1="12" y1="9" x2="12" y2="2" />
              <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
              <line x1="1" y1="18" x2="3" y2="18" />
              <line x1="21" y1="18" x2="23" y2="18" />
              <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
            </svg>
          }
          label="Sunset"
          value={formatTime(sys.sunset, timezone)}
        />
      </div>
    </section>
  );
};

export default CurrentWeather;
