# type in terminal "pip install pandas dijkstar"
import pandas as pd
from dijkstar import Graph, find_path

graph = Graph()

graph.add_node("g_1", "Lorem ipsum")
graph.add_node("g_2", "Lorem ipsum")
graph.add_node("g_3", "Lorem ipsum")
graph.add_node("g_4", "Lorem ipsum")
graph.add_node("g_5", "Lorem ipsum")
graph.add_node("g_6", "Lorem ipsum")
graph.add_node("g_7", "Lorem ipsum")
graph.add_node("g_8", "Lorem ipsum")

graph.add_edge("g_1", "g_2", 110)
graph.add_edge("g_2", "g_3", 125)
graph.add_edge("g_3", "g_4", 108)
graph.add_edge("g_4", "g_5", 108)
graph.add_edge("g_5", "g_6", 108)
graph.add_edge("g_6", "g_7", 108)
graph.add_edge("g_7", "g_8", 108)
graph.add_edge("g_8", "g_9", 108)
graph.add_edge("g_8", "g_9", 108)
graph.add_edge("g_8", "g_9", 108)

PathInfo(
    nodes=[1, 2, 3, 4],
    edges=[110, 125, 108],
    costs=[110, 125, 108],
    total_cost=343)

def find_shortest_path(node_1, node_2):