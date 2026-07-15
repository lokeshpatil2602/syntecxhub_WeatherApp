/**
 * SearchBar.jsx
 * City search input with autocomplete history dropdown,
 * Enter-key support, and a "use my location" button.
 */
import { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, onLocationSearch, searchHistory, onClearHistory, loading }) => {
  const [query,    setQuery]    = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const wrapRef  = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setShowDrop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowDrop(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (city) => {
    setQuery(city);
    onSearch(city);
    setShowDrop(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDrop(false);
      inputRef.current?.blur();
    }
  };

  const filteredHistory = searchHistory.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-wrapper" ref={wrapRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        {/* Search icon */}
        <span className="search-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search city…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowDrop(true); }}
          onFocus={() => setShowDrop(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search for a city"
          autoComplete="off"
          spellCheck="false"
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className="search-btn"
          disabled={loading || !query.trim()}
          aria-label="Search"
        >
          Search
        </button>
      </form>

      {/* Location button */}
      <button
        className="location-btn"
        onClick={() => onLocationSearch()}
        disabled={loading}
        aria-label="Use my current location"
        title="Use current location"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      </button>

      {/* History dropdown */}
      {showDrop && filteredHistory.length > 0 && (
        <div className="search-dropdown" role="listbox" aria-label="Search history">
          <div className="dropdown-header">
            <span>Recent searches</span>
            <button
              className="dropdown-clear"
              onClick={(e) => { e.stopPropagation(); onClearHistory(); }}
              aria-label="Clear history"
            >
              Clear all
            </button>
          </div>
          {filteredHistory.map((city) => (
            <button
              key={city}
              className="dropdown-item"
              role="option"
              onClick={() => handleSelect(city)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="12 8 12 12 14 14" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
