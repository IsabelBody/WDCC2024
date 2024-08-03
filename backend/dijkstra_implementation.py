# dijkstra_implementation.py

from dijkstar import Graph, find_path

# Initialize the graph
graph = Graph()

# Node descriptions
node_descriptions = {
    0: "Galaxy 0",
    1: "Galaxy 1",
    2: "Galaxy 2",
    3: "Galaxy 3",
    4: "Galaxy 4",
    5: "Galaxy 5",
    6: "Galaxy 6",
    7: "Galaxy 7"
}

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
