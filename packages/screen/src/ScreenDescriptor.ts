import type { RoutingNavigationContext } from "./RoutingNavigationContext";

export const ScreenRoutingContext = Symbol("Provides the screen routing navigation context");

export interface ScreenDescriptor {
  [ScreenRoutingContext]: RoutingNavigationContext;
}

export const getScreenRoutingNavigationContext = (screen: ScreenDescriptor) => screen[ScreenRoutingContext];
