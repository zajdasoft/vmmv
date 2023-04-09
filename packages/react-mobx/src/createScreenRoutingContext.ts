import type { ParentScreen, RoutingNavigationContext, ScreenBase } from "@vmmv/screen";
import { isNavigationErrorScreen } from "@vmmv/screen";
import { action } from "mobx"
import {
  createDefaultFinalScreenNavigationOptionsProvider,
  createDefaultParentScreenNavigationOptionsProvider,
  createDefaultRootScreenNavigationOptionsProvider
} from "@vmmv/navigation-provider";
import {
  createDefaultScreenNavigationConsumer
} from "@vmmv/navigation-consumer/src/createDefaultScreenNavigationConsumer";

type ScreenWithPathname = ScreenBase & {
  pathname: () => string;
}

type ScreenWithChildren = ParentScreen<ScreenBase> & {
  children: ScreenBase[];
}

function isScreenWithChildren(screen: ScreenBase): screen is ScreenWithChildren {
  return Array.isArray((screen as ScreenWithChildren).children) && typeof (screen as ScreenWithChildren).child === "object";
}
function isScreenWithPathname(screen: ScreenBase): screen is ScreenWithPathname {
  return typeof (screen as ScreenWithPathname).pathname === "function";
}

export const createScreenRoutingContext = <TScreen extends ScreenBase | ScreenWithPathname>(screen: TScreen): RoutingNavigationContext => {
  if (isNavigationErrorScreen(screen) && isScreenWithChildren(screen)) {
    return {
      provider: createDefaultRootScreenNavigationOptionsProvider(action, screen, screen.children),
      consumer: createDefaultScreenNavigationConsumer(action, screen),
    }
  }

  if (!isScreenWithPathname(screen)) throw Error(`${screen.constructor.name} is missing pathname field.`);

  if (isScreenWithChildren(screen)) {
    return {
      provider: createDefaultParentScreenNavigationOptionsProvider(action, screen, screen.children, screen.pathname),
      consumer: createDefaultScreenNavigationConsumer(action, screen),
    }
  }

  return {
    provider: createDefaultFinalScreenNavigationOptionsProvider(action, screen, screen.pathname),
    consumer: createDefaultScreenNavigationConsumer(action, screen),
  }
}