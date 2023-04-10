import { AbstractScreen } from "./AbstractScreen";
import type { NavigationErrorScreen } from "@vmmv/screen";
import { observable } from "mobx";
import { createDefaultRootScreenNavigationProvider } from "@vmmv/navigation-provider";
import { createDefaultScreenNavigationConsumer, ScreenNavigationConsumerSetter } from "@vmmv/navigation-consumer";
import { actionExecutioner } from "./actionExecutioner";

export abstract class RootScreen<TChildren extends AbstractScreen = AbstractScreen> extends AbstractScreen implements NavigationErrorScreen {
  @observable child: TChildren | null = null;

  protected constructor(protected children: TChildren[], ...setters: ScreenNavigationConsumerSetter<RootScreen<TChildren>>[]) {
    super(screen => ({
      provider: createDefaultRootScreenNavigationProvider(actionExecutioner, screen as RootScreen<TChildren>, children),
      consumer: createDefaultScreenNavigationConsumer(actionExecutioner, screen as RootScreen<TChildren>, ...setters),
    }));
  }

  abstract notifyNavigationFailed(path: string): void;
}
