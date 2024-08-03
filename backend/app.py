# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from dijkstra_implementation import graph, calculate_distance, node_descriptions, name_to_node

app = Flask(__name__)
CORS(app)

# Store selected galaxy
selected_galaxy = None

# Store the current source node (initialized to 0)
current_source_node = 0

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

# Endpoint to get the shortest path from the current source node to the selected galaxy
@app.route('/shortest-path', methods=['GET'])
def get_shortest_path():
    global selected_galaxy, current_source_node
    if selected_galaxy is None:
        return jsonify({'error': 'No galaxy selected'}), 400

    total_cost, path = calculate_distance(graph, current_source_node, selected_galaxy)
    return jsonify({
        'path': path,
        'total_cost': total_cost
    })

# Endpoint to travel to the selected galaxy (update the current source node)
@app.route('/travel', methods=['POST'])
def travel():
    global selected_galaxy, current_source_node
    if selected_galaxy is None:
        return jsonify({'error': 'No galaxy selected'}), 400

    current_source_node = selected_galaxy
    return jsonify({'message': f'Traveled to galaxy {node_descriptions[current_source_node][0]}'})

if __name__ == '__main__':
    app.run(debug=True)
