import { normalizeTheme } from 'shiki/core';
import customDark from './dark.json';
import customLight from './light.json';

const lightType = 'light' as const;
const lightForeground = customLight.colors['editor.foreground'];
const lightBackground = customLight.colors['editor.background'];
const lightRegistration = {
  name: customLight.name,
  type: lightType,
  settings: customLight.tokenColors,
  colors: customLight.colors,
  fg: lightForeground,
  bg: lightBackground,
};

const darkType = 'dark' as const;
const darkForeground = customDark.colors['editor.foreground'];
const darkBackground = customDark.colors['editor.background'];
const darkRegistration = {
  name: customDark.name,
  type: darkType,
  settings: customDark.tokenColors,
  colors: customDark.colors,
  fg: darkForeground,
  bg: darkBackground,
};

export const lightTheme = normalizeTheme(lightRegistration);
export const darkTheme = normalizeTheme(darkRegistration);
export const shikiThemes = {
  light: lightTheme,
  dark: darkTheme,
};
