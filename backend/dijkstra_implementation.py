# dijkstra_implementation.py

from dijkstar import Graph, find_path

graph = Graph()

# Initialized galaxy names
node_descriptions = {
    "g_1": "Galaxy 1",
    "g_2": "Galaxy 2",
    "g_3": "Galaxy 3",
    "g_4": "Galaxy 4",
    "g_5": "Galaxy 5",
    "g_6": "Galaxy 6",
    "g_7": "Galaxy 7",
    "g_8": "Galaxy 8",
}

# Add nodes to the graph
for node in node_descriptions.keys():
    graph.add_node(node)

# The various edges connecting the nodes
graph.add_edge("g_1", "g_2", 3)
graph.add_edge("g_1", "g_3", 5)
graph.add_edge("g_1", "g_4", 7)
graph.add_edge("g_1", "g_5", 3)
graph.add_edge("g_2", "g_3", 6)
graph.add_edge("g_4", "g_5", 10)
graph.add_edge("g_4", "g_6", 4)
graph.add_edge("g_5", "g_6", 5)
graph.add_edge("g_6", "g_7", 5)
graph.add_edge("g_7", "g_8", 1)

# Function to find the shortest path
def find_shortest_path(node_1, node_2):
    path = find_path(graph, node_1, node_2)
    return path
