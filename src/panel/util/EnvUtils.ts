export const isDarkMode = (): boolean => {
  // Browser extensions
  if (process.env.BUILD_ENV === "extension") {
    return chrome.devtools.panels.themeName === "dark";
  }

  // Modern Electron
  const nativeTheme = require("electron")
    .nativeTheme as import("electron").NativeTheme;

  if (nativeTheme) {
    return nativeTheme.shouldUseDarkColors;
  }

  // Legacy Electron
  const systemPreferences = require("electron")
    .systemPreferences as import("electron").SystemPreferences;

  return systemPreferences?.isDarkMode() || true;
};

export const isLightMode = (): boolean => !isDarkMode();
