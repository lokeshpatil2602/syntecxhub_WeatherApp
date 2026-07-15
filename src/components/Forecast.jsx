/**
 * Forecast.jsx
 * 5-day forecast section — groups raw 3-hour data into daily cards.
 */
import { groupForecastByDay } from '../utils/formatDate';
import ForecastCard from './ForecastCard';

const Forecast = ({ data, unit }) => {
  if (!data?.list) return null;

  const days = groupForecastByDay(data.list, data.city.timezone);

  return (
    <section className="forecast" aria-label="5-day forecast">
      <h2 className="forecast-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        5-Day Forecast
      </h2>

      <div className="forecast-grid">
        {days.map((day) => (
          <ForecastCard key={day.date} day={day} unit={unit} />
        ))}
      </div>
    </section>
  );
};

export default Forecast;
