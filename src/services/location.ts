import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  
  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }

  const location = await Location.getCurrentPositionAsync({});
  const address = await getAddressFromCoords(location.coords.latitude, location.coords.longitude);
  
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    address,
  };
};

export const getAddressFromCoords = async (latitude: number, longitude: number) => {
  try {
    const [location] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (location) {
      const address = [
        location.street,
        location.city,
        location.region,
        location.postalCode,
        location.country,
      ]
        .filter(Boolean)
        .join(', ');
      return address;
    }
    return 'Unknown location';
  } catch (error) {
    console.error('Error getting address:', error);
    return 'Error getting address';
  }
};