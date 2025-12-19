import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadUserFromStorage, saveCasesToStorage, loadCasesFromStorage } from '../Utils/StorageUtils';
import { initialCases } from '../Data/CasesData';
import { matchCasesByClues, analyzeThreatLevel } from '../Logic/CaseMatchingLogic';
import '../Styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = loadUserFromStorage();
  const [cases, setCases] = useState([]);
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState('cases');
  const [showAddCase, setShowAddCase] = useState(false);
  const [showMatchClues, setShowMatchClues] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [matchResults, setMatchResults] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const [newCase, setNewCase] = useState({
    caseNumber: '',
    title: '',
    description: '',
    date: '',
    status: 'Active',
    clues: '',
    suspect: '',
    victim: '',
    evidence: '',
    location: '',
    investigator: '',
    threatLevel: 'Low'
  });

  const [cluesInput, setCluesInput] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    const storedCases = loadCasesFromStorage();
    setCases(storedCases || initialCases);
    const storedTodos = JSON.parse(localStorage.getItem('forensicTodos') || '[]');
    setTodos(storedTodos);
  }, [user, navigate]);

  const handleAddCase = () => {
    const caseData = {
      ...newCase,
      id: Date.now(),
      clues: newCase.clues.split(',').map(c => c.trim()),
      evidence: newCase.evidence.split(',').map(e => e.trim()),
      threatLevel: analyzeThreatLevel(
        newCase.clues.split(',').map(c => c.trim()),
        newCase.evidence.split(',').map(e => e.trim())
      )
    };
    const updatedCases = [...cases, caseData];
    setCases(updatedCases);
    saveCasesToStorage(updatedCases);
    setShowAddCase(false);
    resetForm();
  };

  const handleUpdateCase = () => {
    const updatedCase = {
      ...editingCase,
      clues: typeof editingCase.clues === 'string' ? editingCase.clues.split(',').map(c => c.trim()) : editingCase.clues,
      evidence: typeof editingCase.evidence === 'string' ? editingCase.evidence.split(',').map(e => e.trim()) : editingCase.evidence,
      threatLevel: analyzeThreatLevel(
        typeof editingCase.clues === 'string' ? editingCase.clues.split(',').map(c => c.trim()) : editingCase.clues,
        typeof editingCase.evidence === 'string' ? editingCase.evidence.split(',').map(e => e.trim()) : editingCase.evidence
      )
    };
    const updatedCases = cases.map(c => c.id === editingCase.id ? updatedCase : c);
    setCases(updatedCases);
    saveCasesToStorage(updatedCases);
    setEditingCase(null);
  };

  const handleDeleteCase = (id) => {
    if (window.confirm('Delete this case?')) {
      const updatedCases = cases.filter(c => c.id !== id);
      setCases(updatedCases);
      saveCasesToStorage(updatedCases);
    }
  };

  const handleMatchClues = () => {
    const cluesArray = cluesInput.split(',').map(c => c.trim());
    const matches = matchCasesByClues(cluesArray, cases);
    setMatchResults(matches);
  };

  const resetForm = () => {
    setNewCase({
      caseNumber: '', title: '', description: '', date: '', status: 'Active',
      clues: '', suspect: '', victim: '', evidence: '', location: '', investigator: '', threatLevel: 'Low'
    });
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = { id: Date.now(), text: newTodo, completed: false, date: new Date().toISOString() };
      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);
      localStorage.setItem('forensicTodos', JSON.stringify(updatedTodos));
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTodos(updatedTodos);
    localStorage.setItem('forensicTodos', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(t => t.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('forensicTodos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.username}</p>
      </div>

      <div className="dashboard-tabs">
        <button className={activeTab === 'cases' ? 'active' : ''} onClick={() => setActiveTab('cases')}>Cases</button>
        <button className={activeTab === 'match' ? 'active' : ''} onClick={() => setActiveTab('match')}>Match Clues</button>
        <button className={activeTab === 'threats' ? 'active' : ''} onClick={() => setActiveTab('threats')}>Threats</button>
        <button className={activeTab === 'todos' ? 'active' : ''} onClick={() => setActiveTab('todos')}>Todo List</button>
      </div>

      {activeTab === 'cases' && (
        <div className="cases-section">
          <button className="btn btn-primary" onClick={() => setShowAddCase(true)}>Add New Case</button>
          
          {showAddCase && (
            <div className="modal">
              <div className="modal-content">
                <h2>Add New Case</h2>
                <input placeholder="Case Number" value={newCase.caseNumber} onChange={(e) => setNewCase({...newCase, caseNumber: e.target.value})} />
                <input placeholder="Title" value={newCase.title} onChange={(e) => setNewCase({...newCase, title: e.target.value})} />
                <textarea placeholder="Description" value={newCase.description} onChange={(e) => setNewCase({...newCase, description: e.target.value})} />
                <input type="date" value={newCase.date} onChange={(e) => setNewCase({...newCase, date: e.target.value})} />
                <input placeholder="Clues (comma separated)" value={newCase.clues} onChange={(e) => setNewCase({...newCase, clues: e.target.value})} />
                <input placeholder="Suspect" value={newCase.suspect} onChange={(e) => setNewCase({...newCase, suspect: e.target.value})} />
                <input placeholder="Victim" value={newCase.victim} onChange={(e) => setNewCase({...newCase, victim: e.target.value})} />
                <input placeholder="Evidence (comma separated)" value={newCase.evidence} onChange={(e) => setNewCase({...newCase, evidence: e.target.value})} />
                <input placeholder="Location" value={newCase.location} onChange={(e) => setNewCase({...newCase, location: e.target.value})} />
                <input placeholder="Investigator" value={newCase.investigator} onChange={(e) => setNewCase({...newCase, investigator: e.target.value})} />
                <select value={newCase.status} onChange={(e) => setNewCase({...newCase, status: e.target.value})}>
                  <option>Active</option>
                  <option>Under Investigation</option>
                  <option>Closed</option>
                </select>
                <div className="modal-actions">
                  <button className="btn btn-primary" onClick={handleAddCase}>Add Case</button>
                  <button className="btn btn-secondary" onClick={() => { setShowAddCase(false); resetForm(); }}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {editingCase && (
            <div className="modal">
              <div className="modal-content">
                <h2>Edit Case</h2>
                <input placeholder="Case Number" value={editingCase.caseNumber} onChange={(e) => setEditingCase({...editingCase, caseNumber: e.target.value})} />
                <input placeholder="Title" value={editingCase.title} onChange={(e) => setEditingCase({...editingCase, title: e.target.value})} />
                <textarea placeholder="Description" value={editingCase.description} onChange={(e) => setEditingCase({...editingCase, description: e.target.value})} />
                <input type="date" value={editingCase.date} onChange={(e) => setEditingCase({...editingCase, date: e.target.value})} />
                <input placeholder="Clues" value={Array.isArray(editingCase.clues) ? editingCase.clues.join(', ') : editingCase.clues} onChange={(e) => setEditingCase({...editingCase, clues: e.target.value})} />
                <input placeholder="Suspect" value={editingCase.suspect} onChange={(e) => setEditingCase({...editingCase, suspect: e.target.value})} />
                <input placeholder="Victim" value={editingCase.victim} onChange={(e) => setEditingCase({...editingCase, victim: e.target.value})} />
                <input placeholder="Evidence" value={Array.isArray(editingCase.evidence) ? editingCase.evidence.join(', ') : editingCase.evidence} onChange={(e) => setEditingCase({...editingCase, evidence: e.target.value})} />
                <input placeholder="Location" value={editingCase.location} onChange={(e) => setEditingCase({...editingCase, location: e.target.value})} />
                <input placeholder="Investigator" value={editingCase.investigator} onChange={(e) => setEditingCase({...editingCase, investigator: e.target.value})} />
                <select value={editingCase.status} onChange={(e) => setEditingCase({...editingCase, status: e.target.value})}>
                  <option>Active</option>
                  <option>Under Investigation</option>
                  <option>Closed</option>
                </select>
                <div className="modal-actions">
                  <button className="btn btn-primary" onClick={handleUpdateCase}>Update</button>
                  <button className="btn btn-secondary" onClick={() => setEditingCase(null)}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          <div className="cases-grid">
            {cases.map(c => (
              <div key={c.id} className="case-card">
                <h3>{c.caseNumber}: {c.title}</h3>
                <p><strong>Status:</strong> <span className={`status ${c.status.toLowerCase().replace(' ', '-')}`}>{c.status}</span></p>
                <p><strong>Threat:</strong> <span className={`threat ${c.threatLevel.toLowerCase()}`}>{c.threatLevel}</span></p>
                <p><strong>Date:</strong> {c.date}</p>
                <p><strong>Suspect:</strong> {c.suspect}</p>
                <p><strong>Victim:</strong> {c.victim}</p>
                <div className="case-actions">
                  <button className="btn-edit" onClick={() => setEditingCase(c)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDeleteCase(c.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'match' && (
        <div className="match-section">
          <h2>Match Clues with Existing Cases</h2>
          <textarea placeholder="Enter clues (comma separated)" value={cluesInput} onChange={(e) => setCluesInput(e.target.value)} rows="4" />
          <button className="btn btn-primary" onClick={handleMatchClues}>Find Matches</button>
          
          {matchResults.length > 0 && (
            <div className="match-results">
              <h3>Match Results</h3>
              {matchResults.map((match, idx) => (
                <div key={idx} className="match-card">
                  <h4>{match.case.caseNumber}: {match.case.title}</h4>
                  <p><strong>Match Score:</strong> {match.matchScore} ({match.matchPercentage}%)</p>
                  <p><strong>Matched Clues:</strong> {match.matchedClues.join(', ')}</p>
                  <p><strong>Suspect:</strong> {match.case.suspect}</p>
                  <p><strong>Victim:</strong> {match.case.victim}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'threats' && (
        <div className="threats-section">
          <h2>Threat Level Overview</h2>
          <div className="threat-stats">
            <div className="stat-card critical">
              <h3>{cases.filter(c => c.threatLevel === 'Critical').length}</h3>
              <p>Critical</p>
            </div>
            <div className="stat-card high">
              <h3>{cases.filter(c => c.threatLevel === 'High').length}</h3>
              <p>High</p>
            </div>
            <div className="stat-card medium">
              <h3>{cases.filter(c => c.threatLevel === 'Medium').length}</h3>
              <p>Medium</p>
            </div>
            <div className="stat-card low">
              <h3>{cases.filter(c => c.threatLevel === 'Low').length}</h3>
              <p>Low</p>
            </div>
          </div>
          
          <div className="threat-cases">
            {['Critical', 'High', 'Medium', 'Low'].map(level => (
              <div key={level}>
                <h3>{level} Threat Cases</h3>
                {cases.filter(c => c.threatLevel === level).map(c => (
                  <div key={c.id} className="threat-case-item">
                    <p><strong>{c.caseNumber}:</strong> {c.title}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'todos' && (
        <div className="todos-section">
          <h2>Investigation Todo List</h2>
          <div className="todo-input">
            <input placeholder="Add new task..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addTodo()} />
            <button className="btn btn-primary" onClick={addTodo}>Add</button>
          </div>
          <div className="todos-list">
            {todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                <span>{todo.text}</span>
                <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
