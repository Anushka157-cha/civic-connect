import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getGreeting } from '../utils/helpers';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../theme/ThemeContext';

interface AuthState {
  user: {
    name: string;
    phone: string;
    email?: string;
  } | null;
}

export const Header = () => {
  const user = useAuthStore((state: AuthState) => state.user);
  const { colors } = useTheme();
  const greeting = getGreeting();

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: colors.background,
        borderBottomColor: colors.border,
        ...Platform.select({
          ios: {
            shadowColor: colors.text,
          },
          android: {
            elevation: 4,
          },
        }),
      }
    ]}>
      <View>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>{greeting}</Text>
        <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.notificationButton, { backgroundColor: colors.surface }]}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  notificationButton: {
    padding: 8,
  },
});