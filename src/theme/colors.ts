/**
 * StudioKino — Cinematic color palette
 * Dark, moody, premium cinema aesthetic
 */
export const colors = {
  // Backgrounds
  background: '#0A0A0A',
  surface: '#141414',
  surfaceElevated: '#1A1A1A',
  surfaceHighlight: '#222222',

  // Text
  text: '#F5F5F5',
  textSecondary: '#999999',
  textMuted: '#666666',
  textInverse: '#111111',

  // Accent
  accent: '#E50914',
  accentLight: '#FF1A25',
  accentDark: '#B2070F',

  // Ticket cardstock
  cardstock: '#F2F2ED',
  cardstockDark: '#E4E4DD',

  // Borders
  border: '#222222',
  borderLight: '#333333',

  // States
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',

  // Overlays
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.4)',

  // Seats
  seatAvailable: '#1A1A1A',
  seatSelected: '#F5F5F5',
  seatTaken: 'rgba(102, 102, 102, 0.3)',

  // Tab bar
  tabBarBackground: '#0A0A0A',
  tabBarBorder: '#1A1A1A',
  tabActive: '#F5F5F5',
  tabInactive: '#666666',
} as const;

export type ColorKey = keyof typeof colors;
