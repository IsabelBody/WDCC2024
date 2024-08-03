# type in terminal "pip install pandas dijkstar"
import pandas as pd
from dijkstar import Graph, find_path

# backend api needs these two things: galaxy description and shortest path between two galaxies

graph = Graph()

# initialised galaxy name and description about it
graph.add_node("g_1", "Lorem ipsum")
graph.add_node("g_2", "Lorem ipsum")
graph.add_node("g_3", "Lorem ipsum")
graph.add_node("g_4", "Lorem ipsum")
graph.add_node("g_5", "Lorem ipsum")
graph.add_node("g_6", "Lorem ipsum")
graph.add_node("g_7", "Lorem ipsum")
graph.add_node("g_8", "Lorem ipsum")

# the various edges connecting the nodes
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


# idk what this does yet
PathInfo(
    nodes=[1, 2, 3, 4],
    edges=[110, 125, 108],
    costs=[110, 125, 108],
    total_cost=343)

# create the function so that we can repeat 
def find_shortest_path(node_1, node_2):
    pass 