import React from 'react';
import { AVAILABLE_LANGUAGES } from '../data/mockData';

export default function CustomerDashboard({ userName, userLanguages, onNavigate, bookings }) {
  const userLangNames = userLanguages
    .map(code => AVAILABLE_LANGUAGES.find(l => l.code === code)?.nativeName)
    .filter(Boolean);

  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <h1 className="welcome-title">
          Namaste, {userName}! <span className="welcome-emoji">🙏</span>
        </h1>
        <p className="welcome-subtitle">
          You speak: {userLangNames.join(', ')}
          <span className="language-count-badge">{userLanguages.length} languages</span>
        </p>
      </div>

      <div className="action-cards">
        <div className="action-card hotel-card" onClick={() => onNavigate({ currentPage: 'hotel-booking' })}>
          <div className="action-card-bg">
            <span className="action-card-icon">🏨</span>
          </div>
          <div className="action-card-content">
            <h2>Book a Hotel</h2>
            <p>Find hotels with staff who speak your language</p>
            <div className="action-card-features">
              <span>✓ Language-matched rooms</span>
              <span>✓ Verified staff languages</span>
              <span>✓ Stress-free check-in</span>
            </div>
            <div className="action-card-btn">
              Browse Hotels →
            </div>
          </div>
        </div>

        <div className="action-card ride-card" onClick={() => onNavigate({ currentPage: 'ride-booking' })}>
          <div className="action-card-bg">
            <span className="action-card-icon">🚗</span>
          </div>
          <div className="action-card-content">
            <h2>Book a Ride</h2>
            <p>Find drivers who speak your language</p>
            <div className="action-card-features">
              <span>✓ Language-matched drivers</span>
              <span>✓ Clear communication</span>
              <span>✓ Safe & comfortable rides</span>
            </div>
            <div className="action-card-btn">
              Browse Rides →
            </div>
          </div>
        </div>
      </div>

      {bookings.length > 0 && (
        <div className="recent-bookings">
          <h2 className="section-title">Your Recent Bookings</h2>
          <div className="bookings-list">
            {bookings.slice(-3).reverse().map(booking => (
              <div key={booking.id} className="booking-history-card">
                <div className="booking-history-icon">
                  {booking.type === 'hotel' ? '🏨' : '🚗'}
                </div>
                <div className="booking-history-details">
                  <h3>{booking.name}</h3>
                  <p className="booking-history-date">{booking.date}</p>
                  {booking.matchedLanguages?.length > 0 && (
                    <div className="booking-languages">
                      <span className="match-label">Language Match: </span>
                      {booking.matchedLanguages.map(l => {
                        const lang = AVAILABLE_LANGUAGES.find(lang => lang.code === l);
                        return <span key={l} className="matched-lang-tag">{lang?.nativeName || l}</span>;
                      })}
                    </div>
                  )}
                </div>
                <div className="booking-history-price">
                  ₹{booking.price?.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="language-info-banner">
        <div className="banner-icon">💡</div>
        <div className="banner-content">
          <h3>How Language Matching Works</h3>
          <p>We match you with hotels and drivers who speak the languages you know. You'll see a match score for each option, so you can choose the best fit for comfortable communication.</p>
        </div>
      </div>
    </div>
  );
}
