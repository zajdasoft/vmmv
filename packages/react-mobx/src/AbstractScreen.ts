import { RoutingNavigationContext, ScreenDescriptor, ScreenRoutingContext } from "@vmmv/screen";

export abstract class AbstractScreen implements ScreenDescriptor {
  readonly [ScreenRoutingContext]: RoutingNavigationContext;

  protected constructor(routingNavigationContext: (screen: AbstractScreen) => RoutingNavigationContext) {
    this[ScreenRoutingContext] = routingNavigationContext(this);
  }
}
