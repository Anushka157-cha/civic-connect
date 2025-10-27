import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

export const pickAndProcessImage = async (options?: {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
}) => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Camera roll permission not granted');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: options?.allowsEditing ?? true,
      aspect: options?.aspect ?? [1, 1],
      quality: options?.quality ?? 1,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    const image = result.assets[0];

    // Process the image if needed
    const processedImage = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 1000 } }], // Resize to a reasonable width while maintaining aspect ratio
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    return processedImage.uri;
  } catch (error) {
    console.error('Error picking/processing image:', error);
    throw error;
  }
};