import type { ScreenDescriptor } from "./ScreenDescriptor";

export interface NavigationErrorScreen extends ScreenDescriptor {
  notifyNavigationFailed(path: string): void;
}

export function isNavigationErrorScreen(screen: ScreenDescriptor): screen is NavigationErrorScreen {
  return typeof (screen as NavigationErrorScreen).notifyNavigationFailed === "function";
}
