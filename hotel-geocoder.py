from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable
import pandas as pd
import time

def get_hotel_coordinates(hotel_list):
    """
    Find coordinates for a list of hotels in Trivandrum.
    
    Args:
        hotel_list (list): List of hotel names
        
    Returns:
        pandas.DataFrame: DataFrame containing hotel names and their coordinates
    """
    # Initialize the geocoder
    geolocator = Nominatim(user_agent="hotel_finder")
    
    # Create lists to store results
    results = []
    
    for hotel in hotel_list:
        try:
            # Add city name to make search more accurate
            search_query = f"{hotel}, Trivandrum, Kerala, India"
            print(f"Searching for: {hotel}")
            
            # Implement retry mechanism
            max_retries = 3
            for attempt in range(max_retries):
                try:
                    # Get location
                    location = geolocator.geocode(search_query)
                    
                    if location:
                        results.append({
                            'hotel_name': hotel,
                            'latitude': location.latitude,
                            'longitude': location.longitude,
                            'full_address': location.address,
                            'status': 'found'
                        })
                    else:
                        results.append({
                            'hotel_name': hotel,
                            'latitude': None,
                            'longitude': None,
                            'full_address': None,
                            'status': 'not found'
                        })
                    
                    # Add delay to respect API limits
                    time.sleep(1)
                    break
                    
                except (GeocoderTimedOut, GeocoderUnavailable):
                    if attempt == max_retries - 1:
                        results.append({
                            'hotel_name': hotel,
                            'latitude': None,
                            'longitude': None,
                            'full_address': None,
                            'status': 'error'
                        })
                    time.sleep(2)  # Wait longer before retry
                    
        except Exception as e:
            results.append({
                'hotel_name': hotel,
                'latitude': None,
                'longitude': None,
                'full_address': None,
                'status': f'error: {str(e)}'
            })
    
    # Convert results to DataFrame
    df = pd.DataFrame(results)
    return df

def main():
    # Use raw string for file path
    input_file = r"C:\Users\rajiv\OneDrive\Desktop\Code\Hotel.txt"
    
    try:
        # Read hotel names from file
        with open(input_file, 'r', encoding='utf-8') as file:
            # Read lines and remove empty lines and whitespace
            hotels = [line.strip() for line in file if line.strip()]
        
        if not hotels:
            print("No hotels found in the file. Please check if the file is empty.")
            return
        
        print(f"\nFound {len(hotels)} hotels in file.")
        print("Starting search...")
        
        # Get coordinates
        results_df = get_hotel_coordinates(hotels)
        
        # Save to CSV in the same directory as the input file
        output_file = r"C:\Users\rajiv\OneDrive\Desktop\Code\trivandrum_hotels_coordinates.csv"
        results_df.to_csv(output_file, index=False)
        
        # Display results
        print("\nResults:")
        print(results_df)
        print(f"\nResults have been saved to '{output_file}'")
        
    except FileNotFoundError:
        print(f"Error: Could not find file '{input_file}'. Please make sure the file exists in the specified location.")
    except Exception as e:
        print(f"Error reading file: {str(e)}")

if __name__ == "__main__":
    main()
    main()