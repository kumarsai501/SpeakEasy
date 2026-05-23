import React, { useState } from 'react';
import { AVAILABLE_LANGUAGES, MANAGER_TEAMS } from '../data/mockData';

export default function ManagerDashboard({ userName, managerTeamLanguages, onUpdateTeamLanguages }) {
  const [teams, setTeams] = useState(MANAGER_TEAMS);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editMember, setEditMember] = useState(null);

  const getLanguageName = (code) => AVAILABLE_LANGUAGES.find(l => l.code === code)?.nativeName || code;

  const allLanguages = new Set();
  Object.values(teams).forEach(team => {
    team.members.forEach(member => {
      member.languages.forEach(l => allLanguages.add(l));
    });
  });

  const languageCoverage = Array.from(allLanguages).map(code => {
    const count = Object.values(teams).reduce((sum, team) => {
      return sum + team.members.filter(m => m.languages.includes(code)).length;
    }, 0);
    const totalMembers = Object.values(teams).reduce((sum, team) => 
      sum + team.members.reduce((s, m) => s + m.memberCount, 0), 0
    );
    return { code, name: getLanguageName(code), count, percentage: (count / Object.values(teams).reduce((s, team) => s + team.members.length, 0)) * 100 };
  }).sort((a, b) => b.count - a.count);

  return (
    <div className="dashboard-page manager-dashboard">
      <div className="welcome-section">
        <h1 className="welcome-title">
          👔 Manager Dashboard
        </h1>
        <p className="welcome-subtitle">
          Welcome, {userName}! Manage your team's language capabilities
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card coverage-card">
          <div className="card-header">
            <h2>🌐 Language Coverage Overview</h2>
          </div>
          <div className="coverage-list">
            {languageCoverage.map(lc => (
              <div key={lc.code} className="coverage-item">
                <div className="coverage-header">
                  <span className="coverage-lang">{lc.name}</span>
                  <span className="coverage-count">{lc.count} team members</span>
                </div>
                <div className="coverage-bar-bg">
                  <div
                    className="coverage-bar-fill"
                    style={{ width: `${Math.min(lc.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card insights-card">
          <div className="card-header">
            <h2>📊 Key Insights</h2>
          </div>
          <div className="insights-list">
            <div className="insight-item">
              <span className="insight-icon">✅</span>
              <div>
                <strong>Top Language:</strong> {languageCoverage[0]?.name || 'N/A'}
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-icon">⚠️</span>
              <div>
                <strong>Coverage Gap:</strong> {languageCoverage.filter(lc => lc.count === 0).length} languages not covered
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-icon">💡</span>
              <div>
                <strong>Suggestion:</strong> Add more team members who speak {languageCoverage.filter(lc => lc.count === 0).map(lc => lc.name).slice(0, 3).join(', ') || 'all languages'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="teams-section">
        {Object.entries(teams).map(([teamKey, team]) => (
          <div key={teamKey} className="dashboard-card team-card">
            <div className="card-header">
              <h2>👥 {team.name}</h2>
              <span className="team-count">{team.members.length} groups</span>
            </div>
            <div className="team-members">
              {team.members.map(member => (
                <div key={member.id} className="team-member-card">
                  <div className="team-member-header">
                    <h3>{member.name}</h3>
                    <span className="member-count">{member.memberCount} people</span>
                  </div>
                  <div className="team-member-languages">
                    {member.languages.map(l => (
                      <span key={l} className="team-lang-tag">{getLanguageName(l)}</span>
                    ))}
                  </div>
                  <button
                    className="edit-member-btn"
                    onClick={() => setEditMember({ teamKey, member })}
                  >
                    Edit Languages
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-card achievements-card">
        <div className="card-header">
          <h2>🏆 Language Inclusivity Score</h2>
        </div>
        <div className="achievement-content">
          <div className="score-circle">
            <span className="score-number">
              {Math.round((languageCoverage.filter(lc => lc.count > 0).length / AVAILABLE_LANGUAGES.length) * 100)}%
            </span>
            <span className="score-label">Coverage</span>
          </div>
          <div className="achievement-details">
            <p>Your team covers <strong>{languageCoverage.filter(lc => lc.count > 0).length}</strong> out of <strong>{AVAILABLE_LANGUAGES.length}</strong> languages.</p>
            <p>Target: Cover all major Indian languages to maximize guest satisfaction.</p>
            <div className="target-progress">
              {AVAILABLE_LANGUAGES.map(l => {
                const covered = languageCoverage.find(lc => lc.code === l.code)?.count > 0;
                return (
                  <span
                    key={l.code}
                    className={`target-dot ${covered ? 'covered' : ''}`}
                    title={`${l.nativeName}: ${covered ? 'Covered' : 'Not covered'}`}
                  >
                    {l.nativeName}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {editMember && (
        <div className="modal-overlay" onClick={() => setEditMember(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Languages: {editMember.member.name}</h2>
              <button className="modal-close" onClick={() => setEditMember(null)}>×</button>
            </div>
            <p className="modal-desc">
              Select languages spoken by this team group.
            </p>
            <div className="language-grid-editor">
              {AVAILABLE_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`lang-option ${editMember.member.languages.includes(lang.code) ? 'selected' : ''}`}
                  onClick={() => {
                    const newTeams = { ...teams };
                    const team = newTeams[editMember.teamKey];
                    const member = team.members.find(m => m.id === editMember.member.id);
                    if (member.languages.includes(lang.code)) {
                      member.languages = member.languages.filter(c => c !== lang.code);
                    } else {
                      member.languages = [...member.languages, lang.code];
                    }
                    setTeams(newTeams);
                  }}
                >
                  <span className="lang-native">{lang.nativeName}</span>
                  <span className="lang-name">{lang.name}</span>
                </button>
              ))}
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={() => {
                onUpdateTeamLanguages(teams);
                setEditMember(null);
              }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
