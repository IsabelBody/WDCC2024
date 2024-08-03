import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nodeName, setNodeName] = useState('');
  const [galaxyName, setGalaxyName] = useState('');
  const [galaxyDescription, setGalaxyDescription] = useState('');
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [path, setPath] = useState([]);
  const [pathCost, setPathCost] = useState(null);

  const handleSearch = () => {
    if (!nodeName) return;

    // Fetch the galaxy name from the Flask backend
    axios.get(`http://127.0.0.1:5000/galaxy/${nodeName}`)
      .then(response => {
        const name = response.data.name;
        const description = response.data.description;
        setGalaxyName(name);
        setGalaxyDescription(description);
        setError('');

        // Immediately calculate the shortest path to the selected galaxy
        axios.post('http://127.0.0.1:5000/select-galaxy', { node: parseInt(nodeName) })
          .then(() => {
            axios.get('http://127.0.0.1:5000/shortest-path')
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
      })
      .catch(() => {
        setGalaxyName('');
        setGalaxyDescription('');
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
          type="number"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Enter node ID (e.g., 0)"
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {galaxyName && (
          <div>
            <p>{galaxyName}</p>
          </div>
        )}
        {galaxyDescription && (
          <div>
            <p>{galaxyDescription}</p>
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
