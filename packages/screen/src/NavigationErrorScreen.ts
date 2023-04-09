import type { ScreenBase } from "./ScreenBase";

export interface NavigationErrorScreen extends ScreenBase {
  notifyNavigationFailed(path: string): void;
}

export function isNavigationErrorScreen(screen: ScreenBase): screen is NavigationErrorScreen {
  return typeof (screen as NavigationErrorScreen).notifyNavigationFailed === "function";
}
