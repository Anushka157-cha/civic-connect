import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  variant?: 'solid' | 'outlined';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  variant = 'solid',
}) => {
  const { colors, isDark } = useTheme();

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: variant === 'solid' ? colors.primary : 'transparent',
      borderWidth: variant === 'outlined' ? 2 : 0,
      borderColor: colors.primary,
    },
    style,
  ];

  const textStyles = [
    styles.buttonText,
    {
      color: variant === 'solid' ? (isDark ? colors.background : '#FFFFFF') : colors.primary,
    },
  ];

  return (
    <Pressable 
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && { opacity: 0.8 },
      ]}
      onPress={onPress}
    >
      <Text style={textStyles}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});