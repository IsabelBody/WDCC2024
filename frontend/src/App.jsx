import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nodeName, setNodeName] = useState('');
  const [galaxyName, setGalaxyName] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!nodeName) return;

    // Fetch the galaxy name from the Flask backend
    axios.get(`http://localhost:5000/galaxy/${nodeName}`)
      .then(response => {
        setGalaxyName(response.data.name);
        setError('');
      })
      .catch(error => {
        setGalaxyName('');
        setError('Node not found');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Galaxy Node</h1>
        <input
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Enter node ID (e.g., g_1)"
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {galaxyName && (
          <div>
            <h2>Galaxy Name</h2>
            <p>{galaxyName}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
