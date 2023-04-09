import type { RoutingNavigationContext } from "./RoutingNavigationContext";

export const ScreenRoutingContext = Symbol("Provides the screen routing navigation context");

export interface ScreenBase {
  [ScreenRoutingContext]: RoutingNavigationContext;
}

export const getScreenRoutingNavigationContext = (screen: ScreenBase) => screen[ScreenRoutingContext];
