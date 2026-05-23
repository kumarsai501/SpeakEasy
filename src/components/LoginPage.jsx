import React, { useState } from 'react';

const MOTIVATIONAL_QUOTES = [
  '"Language is the road map of a culture. It tells you where its people come from and where they are going." — Rita Mae Brown',
  '"If you talk to a man in a language he understands, that goes to his head. If you talk to him in his own language, that goes to his heart." — Nelson Mandela',
  '"To have another language is to possess a second soul." — Charlemagne',
  '"Language is the blood of the soul into which thoughts run and out of which they grow." — Oliver Wendell Holmes'
];

const ROLE_DETAILS = {
  customer: {
    title: 'Customer',
    icon: '✈️',
    description: 'Book hotels & rides with language-matched providers',
    features: ['Find hotels with staff speaking your language', 'Book rides with drivers you can communicate with', 'Stress-free travel across India']
  },
  'hotel-provider': {
    title: 'Hotel Provider',
    icon: '🏨',
    description: 'List your hotel and attract more guests',
    features: ['Showcase staff languages', 'Get matched with compatible guests', 'Increase bookings & satisfaction']
  },
  'transport-provider': {
    title: 'Transport Provider',
    icon: '🚗',
    description: 'Register as a driver and get more rides',
    features: ['List languages you speak', 'Connect with riders who prefer your language', 'Better ratings & more trips']
  },
  manager: {
    title: 'Manager',
    icon: '👔',
    description: 'Manage your team\'s language capabilities',
    features: ['Assign languages to team members', 'Optimize language coverage', 'Ensure guest satisfaction']
  }
};

export default function LoginPage({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [quote] = useState(() => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowNameInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && selectedRole) {
      onLogin(selectedRole, name.trim());
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-animation">
        <div className="floating-icon" style={{ top: '10%', left: '5%' }}>🌐</div>
        <div className="floating-icon" style={{ top: '20%', right: '10%' }}>🏨</div>
        <div className="floating-icon" style={{ bottom: '30%', left: '15%' }}>🚗</div>
        <div className="floating-icon" style={{ bottom: '15%', right: '5%' }}>🗣️</div>
        <div className="floating-icon" style={{ top: '50%', left: '5%' }}>🆎</div>
        <div className="floating-icon" style={{ top: '40%', right: '5%' }}>🌍</div>
      </div>

      <div className="login-container">
        <div className="login-header">
          <div className="logo-container">
            <span className="logo-icon">🌐</span>
          </div>
          <h1 className="app-title">SpeakEasy Travel</h1>
          <p className="app-tagline">Break Language Barriers, Travel Freely</p>
          <p className="app-quote">{quote}</p>
        </div>

        {!showNameInput ? (
          <div className="role-selection">
            <h2 className="role-title">I am a...</h2>
            <div className="role-grid">
              {Object.entries(ROLE_DETAILS).map(([key, role]) => (
                <button
                  key={key}
                  className={`role-card ${selectedRole === key ? 'selected' : ''}`}
                  onClick={() => handleRoleSelect(key)}
                >
                  <span className="role-icon">{role.icon}</span>
                  <span className="role-name">{role.title}</span>
                  <span className="role-desc">{role.description}</span>
                  <ul className="role-features">
                    {role.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <div className="role-select-hint">Select →</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form className="name-form" onSubmit={handleSubmit}>
            <div className="selected-role-display">
              <span className="selected-role-icon">{ROLE_DETAILS[selectedRole]?.icon}</span>
              <span className="selected-role-name">{ROLE_DETAILS[selectedRole]?.title}</span>
              <button
                type="button"
                className="change-role-btn"
                onClick={() => { setShowNameInput(false); setSelectedRole(null); }}
              >
                Change
              </button>
            </div>
            <div className="input-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                maxLength={50}
              />
            </div>
            <button
              type="submit"
              className={`submit-btn ${name.trim() ? '' : 'disabled'}`}
              disabled={!name.trim()}
            >
              Continue →
            </button>
          </form>
        )}

        <div className="login-footer">
          <p>🌐 SpeakEasy Travel — Removing language barriers, one booking at a time</p>
        </div>
      </div>
    </div>
  );
}
