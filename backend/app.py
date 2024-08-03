# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from dijkstra_implementation import graph, calculate_distance, node_descriptions, name_to_node

app = Flask(__name__)
CORS(app)

# Store selected galaxy
selected_galaxy = None

# Endpoint to get galaxy name
@app.route('/galaxy/<string:name>', methods=['GET'])
def get_galaxy_name(name):
    node = name_to_node.get(name)
    if node is not None:
        data = node_descriptions.get(node)
        return jsonify({'name': data[0], 'description': data[1]})
    else:
        return jsonify({'error': 'Galaxy not found'}), 404

# Endpoint to set the selected galaxy
@app.route('/select-galaxy', methods=['POST'])
def select_galaxy():
    global selected_galaxy
    data = request.json
    name = data.get('name')
    node = name_to_node.get(name)
    if node is not None:
        selected_galaxy = node
        return jsonify({'message': f'Galaxy {name} selected'})
    else:
        return jsonify({'error': 'Invalid galaxy name'}), 400

# Endpoint to get the shortest path from source (0) to the selected galaxy
@app.route('/shortest-path', methods=['GET'])
def get_shortest_path():
    global selected_galaxy
    if selected_galaxy is None:
        return jsonify({'error': 'No galaxy selected'}), 400

    source_node = 0  # Source is always node 0
    total_cost, path = calculate_distance(graph, source_node, selected_galaxy)
    return jsonify({
        'path': path,
        'total_cost': total_cost
    })

if __name__ == '__main__':
    app.run(debug=True)
