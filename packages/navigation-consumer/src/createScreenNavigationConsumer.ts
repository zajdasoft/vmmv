import type { ScreenBase, NavigationConsumer } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";
import type { ActionExecutioner } from "@vmmv/common";

export const createScreenNavigationConsumer = <TScreen extends ScreenBase>(
  action: ActionExecutioner,
  parent: TScreen,
  ...setters: ScreenNavigationConsumerSetter[]
): NavigationConsumer => ({
  consumeNavigation: (ctx) => action(
    `${parent.constructor.name} consumed navigation.`,
    () => setters.forEach(s => s(parent, ctx))),
})
