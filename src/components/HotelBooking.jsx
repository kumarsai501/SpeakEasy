import React, { useState, useMemo } from 'react';
import { HOTELS, filterByLanguage, AVAILABLE_LANGUAGES } from '../data/mockData';

export default function HotelBooking({ userLanguages, onBook, onBack }) {
  const [sortBy, setSortBy] = useState('match');
  const [filterCity, setFilterCity] = useState('all');
  const [selectedHotel, setSelectedHotel] = useState(null);

  const filteredHotels = useMemo(() => {
    let hotels = filterByLanguage(HOTELS, userLanguages, 'hotel');

    if (filterCity !== 'all') {
      hotels = hotels.filter(h => h.location === filterCity);
    }

    if (sortBy === 'price-low') {
      hotels.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      hotels.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      hotels.sort((a, b) => b.rating - a.rating);
    }
    // Default: sort by match score (already done in filterByLanguage)

    return hotels;
  }, [userLanguages, sortBy, filterCity]);

  const cities = [...new Set(HOTELS.map(h => h.location))];
  const getLanguageName = (code) => AVAILABLE_LANGUAGES.find(l => l.code === code)?.nativeName || code;

  if (selectedHotel) {
    return (
      <div className="booking-detail-page">
        <button className="back-btn" onClick={() => setSelectedHotel(null)}>
          ← Back to results
        </button>

        <div className="hotel-detail-card">
          <div className="hotel-detail-image" style={{ backgroundImage: `url(${selectedHotel.image})` }}>
            <div className="hotel-detail-overlay">
              <h1>{selectedHotel.name}</h1>
              <p className="hotel-detail-location">📍 {selectedHotel.location}</p>
            </div>
          </div>

          <div className="hotel-detail-body">
            <div className="detail-stats">
              <div className="stat">
                <span className="stat-value">₹{selectedHotel.price.toLocaleString()}</span>
                <span className="stat-label">per night</span>
              </div>
              <div className="stat">
                <span className="stat-value">⭐ {selectedHotel.rating}</span>
                <span className="stat-label">{selectedHotel.reviews} reviews</span>
              </div>
              <div className="stat">
                <span className="stat-value">{selectedHotel.matchScore.toFixed(0)}%</span>
                <span className="stat-label">language match</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Staff Languages</h3>
              <div className="detail-languages">
                {selectedHotel.staffLanguages.map(l => (
                  <span key={l} className={`detail-lang-tag ${userLanguages.includes(l) ? 'match' : ''}`}>
                    {getLanguageName(l)}
                    {userLanguages.includes(l) && ' ✓'}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {selectedHotel.amenities.map(a => (
                  <span key={a} className="amenity-tag">✓ {a}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Available Room Types</h3>
              <div className="room-types">
                {selectedHotel.rooms.map(r => (
                  <div key={r} className="room-type">{r}</div>
                ))}
              </div>
            </div>

            <button
              className="book-now-btn large"
              onClick={() => onBook({
                type: 'hotel',
                name: selectedHotel.name,
                location: selectedHotel.location,
                price: selectedHotel.price,
                image: selectedHotel.image,
                matchedLanguages: selectedHotel.matchedLanguages,
                matchScore: selectedHotel.matchScore
              })}
            >
              Book Now — ₹{selectedHotel.price.toLocaleString()}/night
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <button className="back-btn" onClick={onBack}>← Dashboard</button>
        <h1>🏨 Find Your Perfect Hotel</h1>
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
        Found <strong>{filteredHotels.length}</strong> hotels with language matching
        {userLanguages.length > 0 && (
          <span className="your-langs">
            {' '}— Your languages: {userLanguages.map(l => getLanguageName(l)).join(', ')}
          </span>
        )}
      </div>

      <div className="results-grid">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="result-card" onClick={() => setSelectedHotel(hotel)}>
            <div className="result-card-image" style={{ backgroundImage: `url(${hotel.image})` }}>
              <div className="match-badge" style={{ '--score': `${hotel.matchScore}%` }}>
                {hotel.matchScore.toFixed(0)}% Match
              </div>
              <div className="price-badge">
                ₹{hotel.price.toLocaleString()}<span>/night</span>
              </div>
            </div>
            <div className="result-card-body">
              <h3>{hotel.name}</h3>
              <p className="result-location">📍 {hotel.location}</p>
              <div className="result-rating">
                ⭐ {hotel.rating} <span className="review-count">({hotel.reviews} reviews)</span>
              </div>
              <div className="result-languages">
                {hotel.staffLanguages.map(l => (
                  <span key={l} className={`result-lang ${userLanguages.includes(l) ? 'active' : ''}`}>
                    {getLanguageName(l)}
                  </span>
                ))}
              </div>
              {hotel.matchedLanguages.length > 0 && (
                <div className="match-indicator">
                  <span className="match-dot"></span>
                  Staff speaks {hotel.matchedLanguages.map(l => getLanguageName(l)).join(', ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <h3>No hotels found</h3>
          <p>Try changing your filters or selecting more languages</p>
        </div>
      )}
    </div>
  );
}
