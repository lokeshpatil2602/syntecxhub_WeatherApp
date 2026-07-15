/**
 * ErrorMessage.jsx
 * Displays a friendly error card with an optional retry action.
 */
const ErrorMessage = ({ message, onRetry }) => (
  <div className="error-container" role="alert" aria-live="assertive">
    <div className="error-card">
      {/* Icon */}
      <div className="error-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h3 className="error-title">Oops, something went wrong</h3>
      <p className="error-message">{message}</p>

      {onRetry && (
        <button className="error-retry" onClick={onRetry}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-4.92" />
          </svg>
          Try Again
        </button>
      )}

      <p className="error-hint">
        Try searching for a different city or check your internet connection.
      </p>
    </div>
  </div>
);

export default ErrorMessage;
