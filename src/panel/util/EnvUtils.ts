export const isDarkMode = (): boolean => {
  if (process.env.BUILD_ENV === "extension") {
    if (typeof chrome !== "undefined") {
      return chrome.devtools.panels.themeName === "dark";
    }

    return true;
  }

  const systemPreferences = require("electron")
    .systemPreferences as import("electron").SystemPreferences;

  return systemPreferences.isDarkMode();
};

export const isLightMode = (): boolean => !isDarkMode();
