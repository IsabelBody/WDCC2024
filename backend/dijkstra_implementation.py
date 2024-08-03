# type in terminal "pip install pandas dijkstar"
import pandas as pd
from dijkstar import Graph, find_path
import requests

# backend api needs these two things: galaxy description and shortest path between two galaxies

# need to figure out if it uses adj matrix or list implementation
graph = Graph()

# initialised 8 graph nodes representing each galaxy
for i in range(8):
    graph.add_node(i)

# the various edges connecting the nodes
graph.add_edge(0, 1, 3)
graph.add_edge(1, 0, 3)
graph.add_edge(0, 2, 5)
graph.add_edge(2, 0, 5)
graph.add_edge(0, 3, 7)
graph.add_edge(3, 0, 7)
graph.add_edge(0, 7, 3)
graph.add_edge(7, 0, 3)
graph.add_edge(1, 2, 6)
graph.add_edge(2, 1, 6)
graph.add_edge(3, 4, 10)
graph.add_edge(4, 3, 10)
graph.add_edge(3, 5, 4)
graph.add_edge(5, 3, 4)
graph.add_edge(4, 5, 5)
graph.add_edge(5, 4, 5)
graph.add_edge(5, 6, 5)
graph.add_edge(6, 5, 5)
graph.add_edge(6, 7, 1)
graph.add_edge(7, 6, 1)


# figure out how to update the value as we go along
source_node = 0
# figure out how to gather input from front end input 
destination_node = 6

def update_state(source, destination):
    source = destination
    return source

def calculate_distance(graph, source, destination):
    path_info = find_path(graph, source, destination)
    return path_info.total_cost, path_info.nodes

print(update_state(source_node, destination_node))
print(calculate_distance(graph, source_node, destination_node))
