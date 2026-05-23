import React, { useState, useMemo } from 'react';
import { DRIVERS, filterByLanguage, AVAILABLE_LANGUAGES } from '../data/mockData';

export default function RideBooking({ userLanguages, onBook, onBack }) {
  const [sortBy, setSortBy] = useState('match');
  const [filterCity, setFilterCity] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState(null);

  const filteredDrivers = useMemo(() => {
    let drivers = filterByLanguage(DRIVERS, userLanguages, 'driver');

    if (filterCity !== 'all') {
      drivers = drivers.filter(d => d.location === filterCity);
    }

    if (sortBy === 'price-low') {
      drivers.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      drivers.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      drivers.sort((a, b) => b.rating - a.rating);
    }

    return drivers;
  }, [userLanguages, sortBy, filterCity]);

  const cities = [...new Set(DRIVERS.map(d => d.location))];
  const getLanguageName = (code) => AVAILABLE_LANGUAGES.find(l => l.code === code)?.nativeName || code;

  if (selectedDriver) {
    return (
      <div className="booking-detail-page">
        <button className="back-btn" onClick={() => setSelectedDriver(null)}>
          ← Back to results
        </button>

        <div className="driver-detail-card">
          <div className="driver-detail-header">
            <img src={selectedDriver.photo} alt={selectedDriver.name} className="driver-detail-photo" />
            <div className="driver-detail-info">
              <h1>{selectedDriver.name}</h1>
              <p className="driver-detail-vehicle">
                🚗 {selectedDriver.vehicle} ({selectedDriver.vehicleType})
              </p>
              <p className="driver-detail-plate">{selectedDriver.plateNumber}</p>
            </div>
          </div>

          <div className="detail-stats">
            <div className="stat">
              <span className="stat-value">₹{selectedDriver.price.toLocaleString()}</span>
              <span className="stat-label">{selectedDriver.priceUnit}</span>
            </div>
            <div className="stat">
              <span className="stat-value">⭐ {selectedDriver.rating}</span>
              <span className="stat-label">{selectedDriver.rides} rides</span>
            </div>
            <div className="stat">
              <span className="stat-value">{selectedDriver.matchScore.toFixed(0)}%</span>
              <span className="stat-label">language match</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Languages Spoken</h3>
            <div className="detail-languages">
              {selectedDriver.languages.map(l => (
                <span key={l} className={`detail-lang-tag ${userLanguages.includes(l) ? 'match' : ''}`}>
                  {getLanguageName(l)}
                  {userLanguages.includes(l) && ' ✓'}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>Location</h3>
            <p>📍 {selectedDriver.location}</p>
          </div>

          <div className="detail-section">
            <h3>Why this is a great match</h3>
            <div className="match-points">
              {selectedDriver.matchedLanguages.length > 0 && (
                <p>✓ You both speak: {selectedDriver.matchedLanguages.map(l => getLanguageName(l)).join(', ')}</p>
              )}
              <p>✓ {selectedDriver.rating} ⭐ driver rating</p>
              <p>✓ {selectedDriver.rides.toLocaleString()} rides completed</p>
              <p>✓ {selectedDriver.vehicleType} — perfect for your needs</p>
            </div>
          </div>

          <button
            className="book-now-btn large uber-style"
            onClick={() => onBook({
              type: 'ride',
              name: selectedDriver.name,
              vehicle: selectedDriver.vehicle,
              price: selectedDriver.price,
              photo: selectedDriver.photo,
              matchedLanguages: selectedDriver.matchedLanguages,
              matchScore: selectedDriver.matchScore,
              location: selectedDriver.location
            })}
          >
            🚗 Book Ride — ₹{selectedDriver.price.toLocaleString()}/{selectedDriver.priceUnit}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <button className="back-btn" onClick={onBack}>← Dashboard</button>
        <h1>🚗 Book a Ride</h1>
      </div>

      <div className="uber-map-placeholder">
        <div className="map-content">
          <span className="map-icon">🗺️</span>
          <p>Interactive Map</p>
          <span className="map-subtext">Select a driver below to see their location</span>
        </div>
      </div>

      <div className="booking-controls">
        <div className="filter-group">
          <label>City</label>
          <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
            <option value="all">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Sort by</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="match">Best Language Match</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="results-info">
        Found <strong>{filteredDrivers.length}</strong> available drivers
        {userLanguages.length > 0 && (
          <span className="your-langs">
            {' '}— Your languages: {userLanguages.map(l => getLanguageName(l)).join(', ')}
          </span>
        )}
      </div>

      <div className="driver-list">
        {filteredDrivers.map(driver => (
          <div key={driver.id} className="driver-card" onClick={() => setSelectedDriver(driver)}>
            <div className="driver-card-left">
              <img src={driver.photo} alt={driver.name} className="driver-photo" />
              <div className={`availability-dot ${driver.available ? 'available' : ''}`}></div>
            </div>
            <div className="driver-card-center">
              <h3>{driver.name}</h3>
              <p className="driver-vehicle">🚗 {driver.vehicle} · {driver.vehicleType}</p>
              <p className="driver-rating">⭐ {driver.rating} · {driver.rides.toLocaleString()} rides</p>
              <div className="driver-languages">
                {driver.languages.map(l => (
                  <span key={l} className={`driver-lang ${userLanguages.includes(l) ? 'active' : ''}`}>
                    {getLanguageName(l)}
                  </span>
                ))}
              </div>
            </div>
            <div className="driver-card-right">
              <div className="driver-price">₹{driver.price.toLocaleString()}</div>
              <div className="driver-price-unit">{driver.priceUnit}</div>
              <div className="driver-match" style={{ '--score': `${driver.matchScore}%` }}>
                {driver.matchScore.toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <h3>No drivers found</h3>
          <p>Try changing your filters or selecting more languages</p>
        </div>
      )}
    </div>
  );
}
