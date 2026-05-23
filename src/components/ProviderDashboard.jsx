import React, { useState } from 'react';
import { AVAILABLE_LANGUAGES } from '../data/mockData';

export default function ProviderDashboard({ role, userName, providerLanguages, onUpdateLanguages, bookings }) {
  const [showLanguageEditor, setShowLanguageEditor] = useState(false);
  const [editLanguages, setEditLanguages] = useState([...providerLanguages]);

  const isHotel = role === 'hotel-provider';
  const getLanguageName = (code) => AVAILABLE_LANGUAGES.find(l => l.code === code)?.nativeName || code;

  const handleSaveLanguages = () => {
    onUpdateLanguages(editLanguages);
    setShowLanguageEditor(false);
  };

  return (
    <div className="dashboard-page provider-dashboard">
      <div className="welcome-section">
        <h1 className="welcome-title">
          {isHotel ? '🏨' : '🚗'} Welcome, {userName}!
        </h1>
        <p className="welcome-subtitle">
          {isHotel ? 'Hotel Provider Dashboard' : 'Transport Provider Dashboard'}
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card language-card-provider">
          <div className="card-header">
            <h2>🗣️ Your Languages</h2>
            <button className="edit-btn" onClick={() => { setEditLanguages([...providerLanguages]); setShowLanguageEditor(true); }}>
              Edit
            </button>
          </div>
          <div className="card-body">
            <p className="card-desc">
              These are the languages you (or your staff) can communicate in.
              Customers filter by language match.
            </p>
            <div className="provider-lang-list">
              {providerLanguages.map(l => (
                <span key={l} className="provider-lang-tag">{getLanguageName(l)}</span>
              ))}
            </div>
            {providerLanguages.length === 0 && (
              <p className="no-langs-msg">No languages selected yet. Click Edit to add languages.</p>
            )}
          </div>
        </div>

        <div className="dashboard-card stats-card">
          <div className="card-header">
            <h2>📊 Overview</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{bookings.length}</span>
              <span className="stat-desc">Total Bookings</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{providerLanguages.length}</span>
              <span className="stat-desc">Languages</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {bookings.filter(b => b.matchedLanguages?.length > 0).length}
              </span>
              <span className="stat-desc">Language-Matched</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">⭐ 4.5</span>
              <span className="stat-desc">Avg Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card bookings-card">
        <div className="card-header">
          <h2>📋 Recent Bookings</h2>
        </div>
        <div className="card-body">
          {bookings.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <p>No bookings yet. Customers will find you when they search for your languages!</p>
            </div>
          ) : (
            <div className="bookings-table">
              {bookings.map((booking, idx) => (
                <div key={idx} className="booking-row">
                  <div className="booking-row-info">
                    <span className="booking-row-name">{booking.name}</span>
                    {booking.matchedLanguages?.length > 0 && (
                      <span className="booking-row-match">Language Match ✓</span>
                    )}
                  </div>
                  <span className="booking-row-price">₹{booking.price?.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-card tips-card">
        <div className="card-header">
          <h2>💡 Tips to Get More Bookings</h2>
        </div>
        <div className="tips-list">
          <div className="tip-item">
            <span className="tip-icon">🌐</span>
            <p>Add more languages to reach a wider audience</p>
          </div>
          <div className="tip-item">
            <span className="tip-icon">⭐</span>
            <p>Maintain high ratings for better visibility</p>
          </div>
          <div className="tip-item">
            <span className="tip-icon">📸</span>
            <p>Update your photos to attract more customers</p>
          </div>
        </div>
      </div>

      {showLanguageEditor && (
        <div className="modal-overlay" onClick={() => setShowLanguageEditor(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Your Languages</h2>
              <button className="modal-close" onClick={() => setShowLanguageEditor(false)}>×</button>
            </div>
            <p className="modal-desc">
              Select all languages that you (or your team) can communicate in.
            </p>
            <div className="language-grid-editor">
              {AVAILABLE_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`lang-option ${editLanguages.includes(lang.code) ? 'selected' : ''}`}
                  onClick={() => setEditLanguages(prev =>
                    prev.includes(lang.code) ? prev.filter(c => c !== lang.code) : [...prev, lang.code]
                  )}
                >
                  <span className="lang-native">{lang.nativeName}</span>
                  <span className="lang-name">{lang.name}</span>
                </button>
              ))}
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowLanguageEditor(false)}>Cancel</button>
              <button
                className={`save-btn ${editLanguages.length === 0 ? 'disabled' : ''}`}
                onClick={handleSaveLanguages}
                disabled={editLanguages.length === 0}
              >
                Save Languages
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
