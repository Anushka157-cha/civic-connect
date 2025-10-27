import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { pickAndProcessImage } from '../utils/imageUtils';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';
import { useReportsStore } from '../store/reportsStore';
import { getCurrentLocation } from '../services/location';

type ReportIssueScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ReportIssue'>;
  route: RouteProp<RootStackParamList, 'ReportIssue'>;
};

export const ReportIssueScreen: React.FC<ReportIssueScreenProps> = ({
  navigation,
  route,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [voiceNote, setVoiceNote] = useState<string | undefined>(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);

  const { addReport } = useReportsStore();

  const pickImage = async () => {
    try {
      const imageUri = await pickAndProcessImage({ aspect: [4, 3] });
      if (imageUri) {
        setImages([...images, imageUri]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick or process image');
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need audio permissions to make this work!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      setIsRecording(true);

      setTimeout(async () => {
        if (recording) {
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();
          if (uri) {
            setVoiceNote(uri);
          }
          setIsRecording(false);
        }
      }, 30000); // Stop recording after 30 seconds
    } catch (error) {
      console.error('Failed to start recording', error);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    // Add recording stop logic
  };

  const handleSubmit = async () => {
    if (!title.trim() || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      await addReport({
        title,
        category: route.params?.category || 'Others',
        location,
        images,
        voiceNote,
        status: 'pending',
        resolutionProgress: {
          issueReported: true,
          departmentAssigned: false,
          workersAssigned: false,
          resolutionStarted: false,
          issueResolved: false,
        },
      });

      Alert.alert('Success', 'Issue reported successfully', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MainTabs'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report');
    }
  };

  const captureLocation = async () => {
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Report an Issue</Text>

        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          <MaterialIcons name="add-a-photo" size={32} color="#666" />
          <Text style={styles.imageUploadText}>Add Photos</Text>
        </TouchableOpacity>

        {images.length > 0 && (
          <ScrollView horizontal style={styles.imagePreview}>
            {images.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={styles.previewImage}
              />
            ))}
          </ScrollView>
        )}

        <TouchableOpacity
          style={styles.voiceNoteButton}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <MaterialIcons
            name={isRecording ? 'stop' : 'mic'}
            size={24}
            color={isRecording ? '#FF3B30' : '#666'}
          />
          <Text style={styles.voiceNoteText}>
            {isRecording ? 'Stop Recording' : 'Add Voice Note (Optional)'}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Issue Title"
          value={title}
          onChangeText={setTitle}
          multiline
        />

        <TouchableOpacity style={styles.locationButton} onPress={captureLocation}>
          <MaterialIcons name="my-location" size={24} color="#666" />
          <Text style={styles.locationButtonText}>
            {location ? 'Update Location' : 'Capture Precise GPS Location'}
          </Text>
        </TouchableOpacity>

        {location && (
          <Text style={styles.locationText}>{location.address}</Text>
        )}

        <PrimaryButton
          title="Submit Report"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  imageUpload: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  imageUploadText: {
    marginTop: 8,
    color: '#666',
  },
  imagePreview: {
    marginBottom: 16,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  voiceNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  voiceNoteText: {
    marginLeft: 8,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  locationButtonText: {
    marginLeft: 8,
    color: '#666',
  },
  locationText: {
    marginBottom: 16,
    color: '#666',
  },
  submitButton: {
    marginTop: 8,
  },
});