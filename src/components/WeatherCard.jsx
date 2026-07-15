/**
 * WeatherCard.jsx
 * Generic stat card — used inside CurrentWeather for details like
 * Humidity, Wind Speed, Feels Like, Pressure, Visibility, etc.
 */
const WeatherCard = ({ icon, label, value, unit, extra }) => (
  <div className="weather-card" aria-label={`${label}: ${value}${unit || ''}`}>
    <div className="weather-card-icon" aria-hidden="true">{icon}</div>
    <div className="weather-card-body">
      <span className="weather-card-label">{label}</span>
      <span className="weather-card-value">
        {value}
        {unit && <span className="weather-card-unit">{unit}</span>}
      </span>
      {extra && <span className="weather-card-extra">{extra}</span>}
    </div>
  </div>
);

export default WeatherCard;
