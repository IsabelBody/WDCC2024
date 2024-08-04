# dijkstra_implementation.py

from dijkstar import Graph, find_path

# Initialize the graph
graph = Graph()

# Node descriptions
node_descriptions = {
    0: ["wdcc", "A galaxy cluster.", "water vegetation life uranium"],
    1: ["aquarius_dwarf", "A galaxy in the Aquarius constellation.", "water vegetation life uranium"],
    2: ["cosmic_redshift", "An effect observed in distant galaxies.", "water uranium"],
    3: ["tucana_dwarf", "A galaxy in the Tucana constellation.", "water vegetation life uranium oil"],
    4: ["leo", "A constellation known for the lion shape.", "uranium"],
    5: ["phoenix", "A galaxy in the Phoenix constellation.", "oil"],
    6: ["draco", "A galaxy in the Draco constellation.", "helium hydrogen uranium"],
    7: ["andromeda", "The Andromeda Galaxy, our closest neighbor.", "water vegetation life uranium helium"],
    8: ["sesa", "A dark and mysterious galaxy, barely visible through dense clouds of interstellar dust, hiding many secrets within.", "hydrogen"],
    9: ["hydra", "A tightly wound spiral galaxy, with a dense central bulge and tightly packed star clusters along its arms.", "nothing"],
    10: ["lyra", "A fading galaxy with an ethereal beauty, where stars are slowly drifting apart and the glow of ancient light lingers.", "oil hydrogen water helium"],
    11: ["saggitarius", "A grand spiral galaxy with sweeping arms of dust and gas, hosting a supermassive black hole at its core.", "water vegetation life uranium helium oil"],
}

# Create reverse lookup for node names
name_to_node = {desc[0]: node for node, desc in node_descriptions.items()}

# Add nodes to the graph
for i in range(12):
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
    (6, 7, 1), (7, 6, 1),
    (1, 8, 4), (8, 1, 4),
    (8, 9, 6), (9, 8, 6),
    (10, 2, 3), (2, 10, 3),
    (11, 9, 4), (9, 11, 4),
    (11, 10, 3), (10, 11, 3),
]

for u, v, cost in edges:
    graph.add_edge(u, v, cost)

def calculate_distance(graph, source, destination, unwanted):
    print(unwanted)
    def cost_func(u, v, edge, prev_edge):
        length = edge
        cost = length
        if v in unwanted:
            cost += 1000
        return cost

    path_info = find_path(graph, source, destination, cost_func=cost_func)
    return path_info.total_cost, path_info.nodes