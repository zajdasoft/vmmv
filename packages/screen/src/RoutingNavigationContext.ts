import type { NavigationProvider } from "./NavigationProvider";
import type { NavigationConsumer } from "./NavigationConsumer";

export interface RoutingNavigationContext {
  provider: NavigationProvider;
  consumer: NavigationConsumer;
}
