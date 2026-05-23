import React from 'react';
import { AVAILABLE_LANGUAGES } from '../data/mockData';

export default function BookingConfirmation({ booking, userLanguages, onBackToDashboard, onNewBooking }) {
  const getLanguageName = (code) => AVAILABLE_LANGUAGES.find(l => l.code === code)?.nativeName || code;

  if (!booking) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-card">
          <div className="confirmation-icon">❓</div>
          <h1>No Booking Details</h1>
          <p>Something went wrong. Please try again.</p>
          <button className="back-btn" onClick={onBackToDashboard}>← Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const isHotel = booking.type === 'hotel';

  return (
    <div className="confirmation-page">
      <div className="confetti-bg">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="confetti-piece" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            backgroundColor: ['#00a651', '#1a1a2e', '#ffd700', '#ff6b6b', '#4ecdc4'][i % 5]
          }}></div>
        ))}
      </div>

      <div className="confirmation-card">
        <div className="confirmation-success">
          <span className="success-icon">✅</span>
        </div>
        <h1 className="confirmation-title">Booking Confirmed!</h1>
        <p className="confirmation-subtitle">
          Your {isHotel ? 'hotel' : 'ride'} has been booked successfully
        </p>

        <div className="confirmation-details">
          {isHotel ? (
            <>
              <div className="confirmation-image" style={{ backgroundImage: `url(${booking.image})` }}></div>
              <div className="confirmation-info">
                <h2>{booking.name}</h2>
                <p>📍 {booking.location}</p>
                <div className="confirmation-price">₹{booking.price?.toLocaleString()}<span>/night</span></div>
              </div>
            </>
          ) : (
            <>
              <div className="confirmation-driver">
                {booking.photo && <img src={booking.photo} alt={booking.name} className="confirmation-photo" />}
                <div className="confirmation-info">
                  <h2>{booking.name}</h2>
                  <p>🚗 {booking.vehicle}</p>
                  <p>📍 {booking.location}</p>
                  <div className="confirmation-price">₹{booking.price?.toLocaleString()}</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="confirmation-language-match">
          <h3>🌐 Language Match</h3>
          {booking.matchedLanguages?.length > 0 ? (
            <div className="match-result">
              <div className="match-score-big">
                <span className="match-score-value">{booking.matchScore?.toFixed(0)}%</span>
                <span className="match-score-label">Language Match</span>
              </div>
              <p className="match-description">
                You can communicate in <strong>{booking.matchedLanguages.map(l => getLanguageName(l)).join(', ')}</strong>!
                No language barriers here. 🎉
              </p>
            </div>
          ) : (
            <p className="match-description muted">
              No language match data available. You can still communicate using common languages or translation tools.
            </p>
          )}
        </div>

        <div className="confirmation-next-steps">
          <h3>📋 Next Steps</h3>
          <ul>
            <li>✓ Your booking has been sent to the provider</li>
            <li>📞 They will contact you in your preferred language</li>
            <li>🗣️ Use the language match to communicate comfortably</li>
            <li>⭐ After your stay/ride, leave a review!</li>
          </ul>
        </div>

        <div className="confirmation-actions">
          <button className="secondary-btn" onClick={onBackToDashboard}>
            ← Back to Dashboard
          </button>
          <button className="primary-btn" onClick={() => {
            onBackToDashboard();
          }}>
            Book Another →
          </button>
        </div>
      </div>
    </div>
  );
}
