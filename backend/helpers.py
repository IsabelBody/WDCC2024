def calculate_fuel(distance, fuel_per_million_lightyears=1):
    # Calculate the fuel needed based on the distance
    fuel_needed = (distance / 1_000_000) * fuel_per_million_lightyears
    
    # Cap the fuel needed to 1000 xL
    fuel_needed = min(fuel_needed, 1000)
    
    return fuel_needed

# Example usage
distance = 5_000_000  # Example distance in lightyears
fuel_per_million_lightyears = 2  # Example fuel consumption per 1 million lightyears

fuel = calculate_fuel(distance, fuel_per_million_lightyears)
print(f"Fuel needed for {distance} lightyears is {fuel} xL.")
