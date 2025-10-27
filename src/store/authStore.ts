import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  name: string;
  phone: string;
  email?: string;
}

interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (userData: UserData) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (userData) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  initialize: async () => {
    const userDataString = await AsyncStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      set({ user: userData, isAuthenticated: true });
    }
  },
}));