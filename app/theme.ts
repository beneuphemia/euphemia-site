/**
 * EUPHEMIA DESIGN SYSTEM & THEME TOKENS
 * 
 * Centralized theme configuration for Euphemia.
 * Modify these tokens to update colors, typography, and brand styling
 * across the entire application without touching component logic.
 */

export const THEME_COLORS = {
  // Primary Physics Spectrum
  physics: {
    DEFAULT: "#1B4FD8",
    light: "#3B6EF5",
    dark: "#0F2E8A",
    glow: "rgba(27, 79, 216, 0.25)",
    faint: "rgba(27, 79, 216, 0.08)",
  },
  
  // Machine Learning & Discovery Spectrum (Gold)
  ml: {
    DEFAULT: "#C9A84C",
    light: "#E8C96A",
    dark: "#9E7F30",
    glow: "rgba(201, 168, 76, 0.22)",
    faint: "rgba(201, 168, 76, 0.08)",
  },

  // Experimental Validation & Ground Truth (Crimson)
  truth: {
    DEFAULT: "#C03A2B",
    light: "#E74C3C",
    dark: "#8E281E",
    glow: "rgba(192, 58, 43, 0.22)",
    faint: "rgba(192, 58, 43, 0.08)",
  },

  // Deep Obsidian Dark Surface Canvas
  ink: {
    DEFAULT: "#080A10",      // Deepest background
    subtle: "#0C0F1A",       // Section background
    mid: "#121727",          // Card background
    cardHover: "#181E33",    // Card hover state
    border: "rgba(255, 255, 255, 0.08)",
    borderHighlight: "rgba(201, 168, 76, 0.35)",
    borderPhysics: "rgba(27, 79, 216, 0.3)",
  },

  // Typographic Tones
  text: {
    primary: "#FAFBFF",      // Pure crisp white
    secondary: "#8B91B0",    // Technical mist
    muted: "#585E7B",        // Subdued labels
    dim: "#3C425E",          // Borders and tertiary lines
  },
} as const;

export const TYPOGRAPHY = {
  fontSans: "var(--font-sans, 'Inter', system-ui, sans-serif)",
  fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};
