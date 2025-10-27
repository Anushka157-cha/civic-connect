import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Switch,
} from 'react-native';
import { pickAndProcessImage } from '../utils/imageUtils';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { PrimaryButton } from '../components/PrimaryButton';
import { useTheme } from '../theme/ThemeContext';

interface ProfileData {
  name: string;
  phone: string;
  email?: string;
  profilePicture?: string;
}

interface AuthState {
  user: ProfileData | null;
  login: (userData: ProfileData) => Promise<void>;
}

export const ProfileScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const user = useAuthStore((state: AuthState) => state.user);
  const login = useAuthStore((state: AuthState) => state.login);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture,
  });

  const pickImage = async () => {
    try {
      const imageUri = await pickAndProcessImage({ aspect: [1, 1] });
      if (imageUri) {
        setProfileData({
          ...profileData,
          profilePicture: imageUri,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick or process image');
    }
  };

  const handleSave = async () => {
    if (!profileData.name.trim() || !profileData.phone.trim()) {
      Alert.alert('Error', 'Name and phone number are required');
      return;
    }

    try {
      await login(profileData);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={styles.themeToggleContainer}>
          <Text style={[styles.themeText, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={isDark ? colors.background : '#f4f3f4'}
          />
        </View>
        
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {profileData.profilePicture ? (
            <Image
              source={{ uri: profileData.profilePicture }}
              style={styles.profileImage}
            />
          ) : (
            <View style={[styles.profileImagePlaceholder, { backgroundColor: colors.surface }]}>
              <MaterialIcons name="person" size={40} color={colors.textSecondary} />
            </View>
          )}
          <View style={[styles.editBadge, { backgroundColor: colors.primary, borderColor: colors.background }]}>
            <MaterialIcons name="edit" size={16} color={colors.background} />
          </View>
        </TouchableOpacity>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text,
              },
            ]}
            value={profileData.name}
            onChangeText={(text) =>
              setProfileData({ ...profileData, name: text })
            }
            placeholder="Enter your full name"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={[styles.label, { color: colors.textSecondary }]}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={profileData.phone}
            onChangeText={(text) =>
              setProfileData({ ...profileData, phone: text })
            }
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            editable={false}
          />

          <Text style={styles.label}>Email (Optional)</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(text) =>
              setProfileData({ ...profileData, email: text })
            }
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PrimaryButton
            title="Save Changes"
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingVertical: 8,
    marginBottom: 16,
  },
  themeText: {
    fontSize: 16,
    marginRight: 12,
  },
  profileImageContainer: {
    position: 'relative',
    marginVertical: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    elevation: 2,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 8,
  },
});