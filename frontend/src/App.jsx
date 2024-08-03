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
        const name = response.data.name;
        setGalaxyName(name);
        setError('');

        // Immediately calculate the shortest path to the selected galaxy
        if (name) {
          axios.post('http://localhost:5000/select-galaxy', { node: nodeName })
            .then(() => {
              axios.get(`http://localhost:5000/shortest-path/${nodeName}`)
                .then(response => {
                  setPath(response.data.path);
                  setPathCost(response.data.total_cost);
                })
                .catch(() => {
                  setPath([]);
                  setPathCost(null);
                  setError('Failed to calculate path');
                });
            })
            .catch(() => {
              setSelectedMessage('Failed to select galaxy');
            });
        }
      })
      .catch(() => {
        setGalaxyName('');
        setError('Node not found');
        setPath([]);
        setPathCost(null);
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
            <p>{galaxyName}</p>
          </div>
        )}
        {path.length > 0 && (
          <div>
            <h2>Shortest Path</h2>
            <p>Path: {path.join(' -> ')}</p>
            <p>Total Cost: {pathCost}</p>
          </div>
        )}
        {selectedMessage && <p>{selectedMessage}</p>}
      </header>
    </div>
  );
}

export default App;
