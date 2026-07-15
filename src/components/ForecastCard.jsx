/**
 * ForecastCard.jsx
 * Single card in the 5-day forecast strip.
 */
import { formatShortDate } from '../utils/formatDate';

const ForecastCard = ({ day, unit }) => {
  const { date, representative, minTemp, maxTemp } = day;

  const icon    = representative.weather[0].icon;
  const desc    = representative.weather[0].description;
  const dateObj = new Date(date + 'T12:00:00Z');
  const label   = formatShortDate(dateObj.getTime() / 1000, 0);
  const sym     = unit === 'imperial' ? '°F' : '°C';

  return (
    <div className="forecast-card" aria-label={`Forecast for ${label}`}>
      <p className="forecast-day">{label}</p>

      <img
        className="forecast-icon"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={desc}
        width="56"
        height="56"
      />

      <p className="forecast-desc">{desc}</p>

      <div className="forecast-temps">
        <span className="forecast-max" title="High">
          {Math.round(maxTemp)}{sym}
        </span>
        <span className="forecast-divider">/</span>
        <span className="forecast-min" title="Low">
          {Math.round(minTemp)}{sym}
        </span>
      </div>
    </div>
  );
};

export default ForecastCard;
