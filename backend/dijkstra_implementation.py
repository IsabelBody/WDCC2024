# dijkstra_implementation.py

from dijkstar import Graph, find_path

# Initialize the graph
graph = Graph()

# Node descriptions
node_descriptions = {
    0: ["wdcc", "A massive galaxy cluster, such as the Virgo Cluster, which contains thousands of galaxies bound together by gravity."],
    1: ["aquarius_dwarf", "The Aquarius Dwarf Galaxy, a small irregular galaxy located in the Aquarius constellation, known for its low luminosity and sparse star population."],
    2: ["cosmic_redshift", "The observed redshift of light from distant galaxies, caused by the expansion of the universe stretching their light to longer wavelengths."],
    3: ["tucana_dwarf", "The Tucana III Dwarf Galaxy, a small and faint galaxy in the Tucana constellation, recognized for its low surface brightness."],
    4: ["leo", "The Leo constellation, one of the zodiac constellations, known for its prominent star Regulus and its lion-like shape."],
    5: ["phoenix", "The Phoenix Galaxy, part of the Phoenix constellation, is a distant galaxy with notable star-forming regions and complex structure."],
    6: ["draco", "The Draco constellation, home to several interesting galaxies including the Draco I and II Dwarf Galaxies, known for their low surface brightness and irregular shapes."],
    7: ["andromeda", "The Andromeda Galaxy (M31), a large spiral galaxy and the nearest spiral galaxy to the Milky Way, known for its impressive size and structure."],
    8: ["sesa", "An enigmatic galaxy located behind dense interstellar dust clouds, making it challenging to observe in detail, often leading to intriguing research."],
    9: ["hydra", "The Hydra constellation contains several notable galaxies, such as the Hydra I Cluster, which features a large elliptical galaxy with a dense central core."],
    10: ["lyra", "The Lyra constellation, featuring the Ring Nebula (M57), a planetary nebula with a visually striking ring-like appearance, known for its unique structure."],
    11: ["saggitarius", "The Sagittarius A* region, the center of the Milky Way galaxy, contains a supermassive black hole and is surrounded by a dense concentration of stars and gas."],
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