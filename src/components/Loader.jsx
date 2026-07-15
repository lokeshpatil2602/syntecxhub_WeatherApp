/**
 * Loader.jsx
 * Full-screen skeleton / spinner shown while weather data is loading.
 */
const Loader = () => (
  <div className="loader-container" role="status" aria-label="Loading weather data">
    {/* Animated spinner */}
    <div className="spinner">
      <div className="spinner-ring" />
      <div className="spinner-ring" />
      <div className="spinner-ring" />
    </div>

    {/* Skeleton cards */}
    <div className="skeleton-grid">
      <div className="skeleton-main">
        <div className="skeleton-line skeleton-city" />
        <div className="skeleton-line skeleton-temp" />
        <div className="skeleton-line skeleton-desc" />
        <div className="skeleton-row">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-detail" />
          ))}
        </div>
      </div>

      <div className="skeleton-forecast">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton-forecast-card">
            <div className="skeleton-line skeleton-day" />
            <div className="skeleton-circle" />
            <div className="skeleton-line skeleton-range" />
          </div>
        ))}
      </div>
    </div>

    <p className="loader-text">Fetching weather data…</p>
  </div>
);

export default Loader;
