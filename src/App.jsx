import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import LanguageSelector from './components/LanguageSelector';
import CustomerDashboard from './components/CustomerDashboard';
import HotelBooking from './components/HotelBooking';
import RideBooking from './components/RideBooking';
import ProviderDashboard from './components/ProviderDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import BookingConfirmation from './components/BookingConfirmation';
import { AVAILABLE_LANGUAGES } from './data/mockData';

function App() {
  const [appState, setAppState] = useState({
    currentPage: 'login',
    userRole: null,
    userName: '',
    userLanguages: [],
    bookings: [],
    providerLanguages: [],
    managerTeamLanguages: {}
  });

  const updateState = useCallback((updates) => {
    setAppState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleLogin = (role, name) => {
    updateState({
      currentPage: 'language-selection',
      userRole: role,
      userName: name
    });
  };

  const handleLanguagesSelected = (languages) => {
    const { userRole } = appState;
    if (userRole === 'customer') {
      updateState({ userLanguages: languages, currentPage: 'customer-dashboard' });
    } else if (userRole === 'hotel-provider' || userRole === 'transport-provider') {
      updateState({ providerLanguages: languages, currentPage: 'provider-dashboard' });
    } else if (userRole === 'manager') {
      updateState({ managerTeamLanguages: languages, currentPage: 'manager-dashboard' });
    }
  };

  const handleLogout = () => {
    setAppState({
      currentPage: 'login',
      userRole: null,
      userName: '',
      userLanguages: [],
      bookings: [],
      providerLanguages: [],
      managerTeamLanguages: {}
    });
  };

  const handleBooking = (booking) => {
    const newBookings = [...appState.bookings, { ...booking, id: Date.now(), date: new Date().toLocaleDateString() }];
    updateState({ bookings: newBookings, currentPage: 'booking-confirmation', lastBooking: booking });
  };

  const renderPage = () => {
    switch (appState.currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;

      case 'language-selection':
        return (
          <LanguageSelector
            role={appState.userRole}
            onComplete={handleLanguagesSelected}
            userName={appState.userName}
          />
        );

      case 'customer-dashboard':
        return (
          <CustomerDashboard
            userName={appState.userName}
            userLanguages={appState.userLanguages}
            onNavigate={updateState}
            bookings={appState.bookings}
          />
        );

      case 'hotel-booking':
        return (
          <HotelBooking
            userLanguages={appState.userLanguages}
            onBook={handleBooking}
            onBack={() => updateState({ currentPage: 'customer-dashboard' })}
          />
        );

      case 'ride-booking':
        return (
          <RideBooking
            userLanguages={appState.userLanguages}
            onBook={handleBooking}
            onBack={() => updateState({ currentPage: 'customer-dashboard' })}
          />
        );

      case 'provider-dashboard':
        return (
          <ProviderDashboard
            role={appState.userRole}
            userName={appState.userName}
            providerLanguages={appState.providerLanguages}
            onUpdateLanguages={(langs) => updateState({ providerLanguages: langs })}
            bookings={appState.bookings.filter(b => b.type === (appState.userRole === 'hotel-provider' ? 'hotel' : 'ride'))}
          />
        );

      case 'manager-dashboard':
        return (
          <ManagerDashboard
            userName={appState.userName}
            managerTeamLanguages={appState.managerTeamLanguages}
            onUpdateTeamLanguages={(langs) => updateState({ managerTeamLanguages: langs })}
          />
        );

      case 'booking-confirmation':
        return (
          <BookingConfirmation
            booking={appState.lastBooking}
            userLanguages={appState.userLanguages}
            onBackToDashboard={() => updateState({ currentPage: 'customer-dashboard' })}
            onNewBooking={() => updateState({ currentPage: 'customer-dashboard' })}
          />
        );

      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  const showNavbar = appState.currentPage !== 'login';

  return (
    <div className="app">
      {showNavbar && (
        <nav className="navbar">
          <div className="navbar-inner">
            <div className="nav-brand" onClick={() => {
              if (appState.userRole === 'customer') {
                updateState({ currentPage: 'customer-dashboard' });
              } else if (appState.userRole === 'hotel-provider' || appState.userRole === 'transport-provider') {
                updateState({ currentPage: 'provider-dashboard' });
              } else if (appState.userRole === 'manager') {
                updateState({ currentPage: 'manager-dashboard' });
              }
            }}>
              <span className="nav-logo">🌐</span>
              <span className="nav-title">SpeakEasy Travel</span>
            </div>
            <div className="nav-right">
              <span className="nav-user">
                👤 {appState.userName}
                {appState.userLanguages.length > 0 && (
                  <span className="nav-languages">
                    {appState.userLanguages.map(code => {
                      const lang = AVAILABLE_LANGUAGES.find(l => l.code === code);
                      return lang ? (
                        <span key={code} className="lang-badge-sm">{lang.nativeName}</span>
                      ) : null;
                    })}
                  </span>
                )}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
