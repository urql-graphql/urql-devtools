export const isDarkMode = (): boolean => {
  if (process.env.BUILD_ENV === "extension") {
    return chrome.devtools.panels.themeName === "dark";
  }

  const systemPreferences = require("electron")
    .systemPreferences as import("electron").SystemPreferences;

  return systemPreferences.isDarkMode();
};

export const isLightMode = (): boolean => !isDarkMode();
