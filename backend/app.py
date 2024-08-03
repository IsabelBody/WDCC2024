# app.py

from flask import Flask, jsonify
from flask_cors import CORS
from dijkstra_implementation import graph, node_descriptions

app = Flask(__name__)
CORS(app)

# Endpoint to get galaxy name
@app.route('/galaxy/<node>', methods=['GET'])
def get_galaxy_name(node):
    name = node_descriptions.get(node)
    if name:
        return jsonify({'name': name})
    else:
        return jsonify({'error': 'Node not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
