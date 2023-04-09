import { RoutingNavigationContext, ScreenRoutingContext } from "@vmmv/screen";
import { createScreenRoutingContext } from "@vmmv/react-mobx/src/createScreenRoutingContext";

export class HelloWorldViewModel {
  [ScreenRoutingContext]: RoutingNavigationContext = createScreenRoutingContext(this);
  pathname = () => "hello-world";

}