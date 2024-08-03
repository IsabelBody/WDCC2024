import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [pathInfo, setPathInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!startNode || !endNode) return;

    // Fetch the shortest path from the Flask backend
    axios.get(`http://127.0.0.1:5000/shortest-path/${startNode}/${endNode}`)
      .then(response => {
        setPathInfo(response.data);
        setError('');
      })
      .catch(error => {
        setPathInfo(null);
        setError('Path not found or error occurred');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Shortest Path Between Galaxies</h1>
        <input
          type="text"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
          placeholder="Enter start node ID (e.g., g_1)"
        />
        <input
          type="text"
          value={endNode}
          onChange={(e) => setEndNode(e.target.value)}
          placeholder="Enter end node ID (e.g., g_8)"
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {pathInfo && (
          <div>
            <h2>Shortest Path</h2>
            <p>Nodes: {pathInfo.path.join(' -> ')}</p>
            <p>Descriptions: {pathInfo.descriptions.join(', ')}</p>
            <p>Cost: {pathInfo.cost}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
