// src/GalaxyPathFinder.js
import React, { useState } from 'react';
import axios from 'axios';

function GalaxyPathFinder() {
  const [node1, setNode1] = useState('');
  const [node2, setNode2] = useState('');
  const [path, setPath] = useState(null);

  const fetchShortestPath = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/shortest_path', {
        params: { node_1: node1, node_2: node2 }
      });
      setPath(response.data);
    } catch (error) {
      console.error('Error fetching shortest path:', error);
    }
  };

  return (
    <div>
      <input value={node1} onChange={(e) => setNode1(e.target.value)} placeholder="Node 1" />
      <input value={node2} onChange={(e) => setNode2(e.target.value)} placeholder="Node 2" />
      <button onClick={fetchShortestPath}>Find Shortest Path</button>
      {path && (
        <div>
          <h3>Shortest Path</h3>
          <p>Nodes: {path.nodes.join(' -> ')}</p>
          <p>Total Cost: {path.total_cost}</p>
        </div>
      )}
    </div>
  );
}

export default GalaxyPathFinder;
