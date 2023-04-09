import type { ScreenBase } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";
import { createScreenNavigationConsumer } from "./createScreenNavigationConsumer";
import { screenNavigationConsumerSetNavigator } from "./screenNavigationConsumerSetNavigator";
import { screenNavigationConsumerSetCurrentPathname } from "./screenNavigationConsumerSetCurrentPathname";
import { screenNavigationConsumerSetCurrentScreenPath } from "./screenNavigationConsumerSetCurrentScreenPath";
import { screenNavigationConsumerForwardNavigation } from "./screenNavigationConsumerForwardNavigation";
import type { ActionExecutioner } from "@vmmv/common";

export const createDefaultScreenNavigationConsumer = <TScreen extends ScreenBase>(
  action: ActionExecutioner,
  parent: TScreen,
  ...setters: ScreenNavigationConsumerSetter[]
) => createScreenNavigationConsumer(
  action,
  parent,
  screenNavigationConsumerSetNavigator,
  screenNavigationConsumerSetCurrentPathname,
  screenNavigationConsumerSetCurrentScreenPath,
  screenNavigationConsumerForwardNavigation,
  ...setters);
