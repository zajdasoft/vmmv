import type { ScreenBase } from "./ScreenBase";
import type { Navigator } from "./Navigator";
import type { PathParams } from "./PathParams";

export interface ScreenNavigationContext {
  getNavigator(): Navigator;
  getScreenPath(): ScreenBase[];
  getPathParams(): PathParams;
  getCurrentPathname(): string;
}
