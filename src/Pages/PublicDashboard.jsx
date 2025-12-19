import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadUserFromStorage, loadCasesFromStorage } from '../Utils/StorageUtils';
import { initialCases } from '../Data/CasesData';
import { matchCasesByClues } from '../Logic/CaseMatchingLogic';
import '../Styles/PublicDashboard.css';

const PublicDashboard = () => {
  const navigate = useNavigate();
  const user = loadUserFromStorage();
  const [cases, setCases] = useState([]);
  const [activeTab, setActiveTab] = useState('view');
  const [cluesInput, setCluesInput] = useState('');
  const [matchResults, setMatchResults] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const storedCases = loadCasesFromStorage();
    setCases(storedCases || initialCases);
  }, [user, navigate]);

  const handleMatchClues = () => {
    const cluesArray = cluesInput.split(',').map(c => c.trim());
    const matches = matchCasesByClues(cluesArray, cases);
    setMatchResults(matches);
  };

  return (
    <div className="public-dashboard">
      <div className="dashboard-header">
        <h1>Public Dashboard</h1>
        <p>Welcome, {user?.username}</p>
      </div>

      <div className="dashboard-tabs">
        <button className={activeTab === 'view' ? 'active' : ''} onClick={() => setActiveTab('view')}>View Cases</button>
        <button className={activeTab === 'match' ? 'active' : ''} onClick={() => setActiveTab('match')}>Match Clues</button>
        <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>Statistics</button>
      </div>

      {activeTab === 'view' && (
        <div className="cases-section">
          <h2>All Cases</h2>
          <div className="cases-grid">
            {cases.map(c => (
              <div key={c.id} className="case-card" onClick={() => setSelectedCase(c)}>
                <h3>{c.caseNumber}: {c.title}</h3>
                <p><strong>Status:</strong> <span className={`status ${c.status.toLowerCase().replace(' ', '-')}`}>{c.status}</span></p>
                <p><strong>Threat:</strong> <span className={`threat ${c.threatLevel.toLowerCase()}`}>{c.threatLevel}</span></p>
                <p><strong>Date:</strong> {c.date}</p>
                <p><strong>Location:</strong> {c.location}</p>
              </div>
            ))}
          </div>

          {selectedCase && (
            <div className="modal" onClick={() => setSelectedCase(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{selectedCase.caseNumber}: {selectedCase.title}</h2>
                <p><strong>Description:</strong> {selectedCase.description}</p>
                <p><strong>Status:</strong> {selectedCase.status}</p>
                <p><strong>Date:</strong> {selectedCase.date}</p>
                <p><strong>Suspect:</strong> {selectedCase.suspect}</p>
                <p><strong>Victim:</strong> {selectedCase.victim}</p>
                <p><strong>Location:</strong> {selectedCase.location}</p>
                <p><strong>Investigator:</strong> {selectedCase.investigator}</p>
                <p><strong>Threat Level:</strong> {selectedCase.threatLevel}</p>
                <p><strong>Clues:</strong> {selectedCase.clues.join(', ')}</p>
                <p><strong>Evidence:</strong> {selectedCase.evidence.join(', ')}</p>
                <button className="btn btn-secondary" onClick={() => setSelectedCase(null)}>Close</button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'match' && (
        <div className="match-section">
          <h2>Match Clues with Cases</h2>
          <textarea placeholder="Enter clues (comma separated)" value={cluesInput} onChange={(e) => setCluesInput(e.target.value)} rows="4" />
          <button className="btn btn-primary" onClick={handleMatchClues}>Find Matches</button>
          
          {matchResults.length > 0 ? (
            <div className="match-results">
              <h3>Match Results</h3>
              {matchResults.map((match, idx) => (
                <div key={idx} className="match-card">
                  <h4>{match.case.caseNumber}: {match.case.title}</h4>
                  <p><strong>Match Score:</strong> {match.matchScore} ({match.matchPercentage}%)</p>
                  <p><strong>Matched Clues:</strong> {match.matchedClues.join(', ')}</p>
                  <p><strong>Suspect:</strong> {match.case.suspect}</p>
                  <p><strong>Victim:</strong> {match.case.victim}</p>
                  <p><strong>Location:</strong> {match.case.location}</p>
                </div>
              ))}
            </div>
          ) : cluesInput && (
            <p>No matches found</p>
          )}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="stats-section">
          <h2>Case Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{cases.length}</h3>
              <p>Total Cases</p>
            </div>
            <div className="stat-card">
              <h3>{cases.filter(c => c.status === 'Active').length}</h3>
              <p>Active Cases</p>
            </div>
            <div className="stat-card">
              <h3>{cases.filter(c => c.status === 'Closed').length}</h3>
              <p>Closed Cases</p>
            </div>
            <div className="stat-card">
              <h3>{cases.filter(c => c.threatLevel === 'Critical' || c.threatLevel === 'High').length}</h3>
              <p>High Priority</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicDashboard;
