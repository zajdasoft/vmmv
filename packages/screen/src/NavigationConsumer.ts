import type { ScreenNavigationContext } from "./ScreenNavigationContext";

export interface NavigationConsumer {
  consumeNavigation(ctx: ScreenNavigationContext): void;
}
