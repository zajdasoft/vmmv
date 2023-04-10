import type { ScreenDescriptor } from "./ScreenDescriptor";
import type { Navigator } from "./Navigator";
import type { PathParams } from "./PathParams";

export interface ScreenNavigationContext {
  getNavigator(): Navigator;
  getScreenPath(): ScreenDescriptor[];
  getPathParams(): PathParams;
  getCurrentPathname(): string;
}
