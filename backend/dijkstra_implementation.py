# dijkstra_implementation.py

from dijkstar import Graph, find_path

# Initialize the graph
graph = Graph()

# Node descriptions
node_descriptions = {
    0: ["wdcc", "A galaxy cluster."],
    1: ["aquarius_dwarf", "A galaxy in the Aquarius constellation."],
    2: ["cosmic_redshift", "An effect observed in distant galaxies."],
    3: ["tucana_dwarf", "A galaxy in the Tucana constellation."],
    4: ["leo", "A constellation known for the lion shape."],
    5: ["phoenix", "A galaxy in the Phoenix constellation."],
    6: ["draco", "A galaxy in the Draco constellation."],
    7: ["andromeda", "The Andromeda Galaxy, our closest neighbor."]
}

# Create reverse lookup for node names
name_to_node = {desc[0]: node for node, desc in node_descriptions.items()}

# Add nodes to the graph
for i in range(8):
    graph.add_node(i)

# Add edges to the graph
edges = [
    (0, 1, 3), (1, 0, 3),
    (0, 2, 5), (2, 0, 5),
    (0, 3, 7), (3, 0, 7),
    (0, 7, 3), (7, 0, 3),
    (1, 2, 6), (2, 1, 6),
    (3, 4, 10), (4, 3, 10),
    (3, 5, 4), (5, 3, 4),
    (4, 5, 5), (5, 4, 5),
    (5, 6, 5), (6, 5, 5),
    (6, 7, 1), (7, 6, 1)
]

for u, v, cost in edges:
    graph.add_edge(u, v, cost)

def calculate_distance(graph, source, destination):
    path_info = find_path(graph, source, destination)
    return path_info.total_cost, path_info.nodes