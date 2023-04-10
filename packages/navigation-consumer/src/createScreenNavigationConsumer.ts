import type { ScreenDescriptor, NavigationConsumer } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";
import type { ActionExecutioner } from "@vmmv/common";

export const createScreenNavigationConsumer = <TScreen extends ScreenDescriptor>(
  action: ActionExecutioner,
  parent: TScreen,
  ...setters: ScreenNavigationConsumerSetter<TScreen>[]
): NavigationConsumer => ({
  consumeNavigation: (ctx) => action(
    `${parent.constructor.name} consumed navigation.`,
    () => setters.forEach(s => s(parent, ctx))),
})
