import type { IScreen, INavigationConsumer } from "@vmmv/screen";
import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";
import type { ActionExecutioner } from "@vmmv/common";

export const createScreenNavigationConsumer = <TScreen extends IScreen<TQueryParams>, TQueryParams>(
  action: ActionExecutioner,
  parent: TScreen,
  ...setters: ScreenNavigationConsumerSetter<TScreen, TQueryParams>[]
): INavigationConsumer<TQueryParams> => ({
  consumeNavigation: (ctx) => action(
    `${parent.constructor.name} consumed navigation.`,
    () => setters.forEach(s => s(parent, ctx))),
})
