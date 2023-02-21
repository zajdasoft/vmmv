import type { IScreen } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";
import { createScreenNavigationConsumer } from "./createScreenNavigationConsumer";
import { screenNavigationConsumerSetNavigator } from "./screenNavigationConsumerSetNavigator";
import { screenNavigationConsumerSetCurrentPathNode } from "./screenNavigationConsumerSetCurrentPathNode";
import { screenNavigationConsumerSetCurrentScreenPath } from "./screenNavigationConsumerSetCurrentScreenPath";
import { screenNavigationConsumerForwardNavigation } from "./screenNavigationConsumerForwardNavigation";
import type { ActionExecutioner } from "@vmmv/common";

export const createDefaultScreenNavigationConsumer = <TScreen extends IScreen<TQueryParams>, TQueryParams>(
  action: ActionExecutioner,
  parent: TScreen,
  ...setters: ScreenNavigationConsumerSetter<TScreen, TQueryParams>[]
) => createScreenNavigationConsumer(
  action,
  parent,
  screenNavigationConsumerSetNavigator,
  screenNavigationConsumerSetCurrentPathNode,
  screenNavigationConsumerSetCurrentScreenPath,
  screenNavigationConsumerForwardNavigation,
  ...setters);
