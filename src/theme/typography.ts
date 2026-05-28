import { TextStyle } from 'react-native';

/**
 * StudioKino — Typography system
 * 
 * Fonts loaded via expo-font:
 * - Oswald: Display headings (cinematic, bold)
 * - Inter: Body text (clean, readable)
 * - JetBrains Mono: Data/numbers (monospace)
 */
export const fontFamilies = {
  display: 'Oswald_700Bold',
  displayLight: 'Oswald_300Light',
  displayMedium: 'Oswald_500Medium',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemiBold: 'Inter_600SemiBold',
  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
} as const;

export const typography: Record<string, TextStyle> = {
  // Display — Large cinematic headings
  displayLarge: {
    fontFamily: fontFamilies.display,
    fontSize: 40,
    lineHeight: 40,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontFamily: fontFamilies.display,
    fontSize: 32,
    lineHeight: 34,
    textTransform: 'uppercase',
    letterSpacing: -0.3,
  },
  displaySmall: {
    fontFamily: fontFamilies.displayMedium,
    fontSize: 24,
    lineHeight: 28,
    textTransform: 'uppercase',
  },

  // Headings
  heading: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  subheading: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 16,
    lineHeight: 24,
  },

  // Body
  body: {
    fontFamily: fontFamilies.sans,
    fontSize: 15,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: fontFamilies.sans,
    fontSize: 13,
    lineHeight: 18,
  },

  // Micro label (like the web version's .micro-label)
  microLabel: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 10,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },

  // Mono (for data, prices, dates)
  mono: {
    fontFamily: fontFamilies.mono,
    fontSize: 14,
    lineHeight: 20,
  },
  monoSmall: {
    fontFamily: fontFamilies.mono,
    fontSize: 12,
    lineHeight: 16,
  },
  monoLarge: {
    fontFamily: fontFamilies.monoMedium,
    fontSize: 20,
    lineHeight: 24,
  },

  // Buttons
  button: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 13,
    lineHeight: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonSmall: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 11,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
} as const;
