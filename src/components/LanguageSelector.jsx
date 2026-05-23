import React, { useState } from 'react';
import { AVAILABLE_LANGUAGES } from '../data/mockData';

const roleConfig = {
  'customer': {
    title: 'How should we address you?',
    subtitle: 'Select the languages you speak — we\'ll match you with hotels and drivers who speak them!',
    buttonText: 'Start Exploring',
    icon: '✈️'
  },
  'hotel-provider': {
    title: 'List Your Hotel',
    subtitle: 'Select all languages your hotel staff can communicate in. Guests will find you based on language match.',
    buttonText: 'Continue to Dashboard',
    icon: '🏨'
  },
  'transport-provider': {
    title: 'Register as Driver',
    subtitle: 'Select all languages you can communicate in. Riders will find you based on language match.',
    buttonText: 'Continue to Dashboard',
    icon: '🚗'
  },
  'manager': {
    title: 'Team Language Profile',
    subtitle: 'Select languages spoken by your team members. This helps match guests with the right staff.',
    buttonText: 'Continue to Dashboard',
    icon: '👔'
  }
};

export default function LanguageSelector({ role, onComplete, userName }) {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const config = roleConfig[role] || roleConfig['customer'];

  const toggleLanguage = (code) => {
    setSelectedLanguages(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  return (
    <div className="page-container language-page">
      <div className="language-card">
        <div className="language-header">
          <span className="language-icon">{config.icon}</span>
          <h1 className="language-title">Welcome, {userName}!</h1>
          <p className="language-subtitle">{config.title}</p>
          <p className="language-desc">{config.subtitle}</p>
        </div>

        <div className="language-grid">
          {AVAILABLE_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`lang-option ${selectedLanguages.includes(lang.code) ? 'selected' : ''}`}
              onClick={() => toggleLanguage(lang.code)}
            >
              <span className="lang-native">{lang.nativeName}</span>
              <span className="lang-name">{lang.name}</span>
              {selectedLanguages.includes(lang.code) && (
                <span className="lang-check">✓</span>
              )}
            </button>
          ))}
        </div>

        {selectedLanguages.length > 0 && (
          <div className="selected-languages-preview">
            <span className="selected-label">Selected: </span>
            {selectedLanguages.map(code => {
              const lang = AVAILABLE_LANGUAGES.find(l => l.code === code);
              return (
                <span key={code} className="selected-lang-tag">
                  {lang.nativeName}
                  <button className="remove-lang" onClick={() => toggleLanguage(code)}>×</button>
                </span>
              );
            })}
          </div>
        )}

        <button
          className={`continue-btn ${selectedLanguages.length === 0 ? 'disabled' : ''}`}
          onClick={() => selectedLanguages.length > 0 && onComplete(selectedLanguages)}
          disabled={selectedLanguages.length === 0}
        >
          {config.buttonText} →
        </button>

        {selectedLanguages.length === 0 && (
          <p className="hint-text">Please select at least one language to continue</p>
        )}
      </div>
    </div>
  );
}
