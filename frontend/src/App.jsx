import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nodeName, setNodeName] = useState('');
  const [galaxyName, setGalaxyName] = useState('');
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [path, setPath] = useState([]);
  const [pathCost, setPathCost] = useState(null);

  const handleSearch = () => {
    if (!nodeName) return;

    // Fetch the galaxy name from the Flask backend
    axios.get(`http://localhost:5000/galaxy/${nodeName}`)
      .then(response => {
        setGalaxyName(response.data.name);
        setError('');
      })
      .catch(() => {
        setGalaxyName('');
        setError('Node not found');
      });
  };

  const handleSelect = () => {
    if (!galaxyName) return;

    // Send the selected galaxy to the Flask backend
    axios.post('http://localhost:5000/select-galaxy', { node: nodeName })
      .then(response => {
        setSelectedMessage(response.data.message);
        setPath([]);
        setPathCost(null);
      })
      .catch(() => {
        setSelectedMessage('Failed to select galaxy');
      });
  };

  const handleCalculatePath = () => {
    if (!nodeName) return;

    // Fetch the shortest path from the selected galaxy
    axios.get(`http://localhost:5000/shortest-path/${nodeName}`)
      .then(response => {
        setPath(response.data.path);
        setPathCost(response.data.total_cost);
        setError('');
      })
      .catch(() => {
        setPath([]);
        setPathCost(null);
        setError('Failed to calculate path');
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
            <button onClick={handleSelect}>Select Galaxy</button>
          </div>
        )}
        {selectedMessage && <p>{selectedMessage}</p>}
        {selectedMessage && (
          <button onClick={handleCalculatePath}>Calculate Shortest Path</button>
        )}
        {path.length > 0 && (
          <div>
            <h2>Shortest Path</h2>
            <p>Path: {path.join(' -> ')}</p>
            <p>Total Cost: {pathCost}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
