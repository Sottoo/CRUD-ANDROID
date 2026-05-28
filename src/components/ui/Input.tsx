import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.text}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.microLabel,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    color: colors.text,
    fontFamily: typography.body.fontFamily,
    fontSize: 18,
    paddingVertical: spacing.sm,
    paddingHorizontal: 0,
  },
  inputError: {
    borderBottomColor: colors.accent,
  },
  errorText: {
    ...typography.microLabel,
    color: colors.accent,
    marginTop: spacing.xs,
  },
});
