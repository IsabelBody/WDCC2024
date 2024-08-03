# dijkstra_implementation.py

from dijkstar import Graph, find_path

graph = Graph()

# Initialized galaxy names
node_descriptions = {
    0: ["WDCCxSESA", "A galaxy cluster."],
    1: ["Aquarius Dwarf", "A galaxy in the Aquarius constellation."],
    2: ["Cosmic Redshift", "An effect observed in distant galaxies."],
    3: ["Tucana Dwarf", "A galaxy in the Tucana constellation."],
    4: ["Leo", "A constellation known for the lion shape."],
    5: ["Phoenix", "A galaxy in the Phoenix constellation."],
    6: ["Draco", "A galaxy in the Draco constellation."],
    7: ["Andromeda", "The Andromeda Galaxy, our closest neighbor."]
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
