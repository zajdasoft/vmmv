import {
  RoutingNavigationContext,
  ScreenBase,
  ScreenRoutingContext
} from "@vmmv/screen";
import { createScreenRoutingContext } from "./createScreenRoutingContext";
import { makeObservable } from "mobx";

const defaultRoutingNavigationContext: RoutingNavigationContext = {
  provider: {
    acceptNavigationChild() {},
    findNavigationChild() { return undefined },
    matchNavigation() { return undefined },
    setNavigationFinalStep() {},
  },
  consumer: {
    consumeNavigation() {}
  }
}

export abstract class Screen implements ScreenBase {
  [ScreenRoutingContext]: RoutingNavigationContext = defaultRoutingNavigationContext;
  protected init() {
    this[ScreenRoutingContext] = createScreenRoutingContext(this);
    makeObservable(this);
  }
}
