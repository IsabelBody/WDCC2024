from flask import Flask, jsonify
from flask_cors import CORS
from dijkstra_implementation import graph, node_descriptions
from dijkstar import find_path

app = Flask(__name__)
CORS(app, resources={r"/galaxy/*": {"origins": "*"}, r"/shortest-path/*": {"origins": "*"}})

# Endpoint to get galaxy name
@app.route('/galaxy/<node>', methods=['GET'])
def get_galaxy_name(node):
    name = node_descriptions.get(node)
    if name:
        return jsonify({'name': name})
    else:
        return jsonify({'error': 'Node not found'}), 404

# Endpoint to find the shortest path
@app.route('/shortest-path/<start>/<end>', methods=['GET'])
def get_shortest_path(start, end):
    try:
        path_info = find_path(graph, start, end)
        path_nodes = path_info.nodes
        path_cost = path_info.total_cost
        path_descriptions = [node_descriptions[node] for node in path_nodes]
        return jsonify({
            'path': path_nodes,
            'descriptions': path_descriptions,
            'cost': path_cost
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
