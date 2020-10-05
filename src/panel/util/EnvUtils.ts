export const isDarkMode = (): boolean => {
  // Browser extensions
  if (process.env.BUILD_ENV === "extension") {
    return chrome.devtools.panels.themeName === "dark";
  }

  // Modern Electron
  const nativeTheme = require("electron")
    .nativeTheme as import("electron").NativeTheme;

  return nativeTheme?.shouldUseDarkColors || true;
};

export const isLightMode = (): boolean => !isDarkMode();
