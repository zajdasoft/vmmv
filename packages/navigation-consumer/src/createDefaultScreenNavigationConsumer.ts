import type { ScreenDescriptor } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";
import { createScreenNavigationConsumer } from "./createScreenNavigationConsumer";
import { screenNavigationConsumerSetNavigator } from "./screenNavigationConsumerSetNavigator";
import { screenNavigationConsumerSetCurrentPathname } from "./screenNavigationConsumerSetCurrentPathname";
import { screenNavigationConsumerSetCurrentScreenPath } from "./screenNavigationConsumerSetCurrentScreenPath";
import { screenNavigationConsumerForwardNavigation } from "./screenNavigationConsumerForwardNavigation";
import type { ActionExecutioner } from "@vmmv/common";

export const createDefaultScreenNavigationConsumer = <TScreen extends ScreenDescriptor>(
  action: ActionExecutioner,
  parent: TScreen,
  ...setters: ScreenNavigationConsumerSetter<TScreen>[]
) => createScreenNavigationConsumer(
  action,
  parent,
  screenNavigationConsumerSetNavigator,
  screenNavigationConsumerSetCurrentPathname,
  screenNavigationConsumerSetCurrentScreenPath,
  screenNavigationConsumerForwardNavigation,
  ...setters);
