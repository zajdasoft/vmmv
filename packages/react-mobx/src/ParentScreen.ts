import { AbstractScreen } from "./AbstractScreen";
import { observable } from "mobx";
import { createDefaultParentScreenNavigationProvider } from "@vmmv/navigation-provider";
import { createDefaultScreenNavigationConsumer } from "@vmmv/navigation-consumer";
import type { ScreenNavigationConsumerSetter } from "@vmmv/navigation-consumer/src";
import { actionExecutioner } from "./actionExecutioner";

export abstract class ParentScreen<TChildren extends AbstractScreen = AbstractScreen> extends AbstractScreen {
  @observable child: TChildren | null = null;
  abstract get pathname(): () => string;

  protected constructor(protected readonly children: TChildren[], ...setters: ScreenNavigationConsumerSetter<ParentScreen<TChildren>>[]) {
    super(screen => ({
      provider: createDefaultParentScreenNavigationProvider(actionExecutioner, screen as ParentScreen<TChildren>, children, () => (screen as ParentScreen<TChildren>).pathname()),
      consumer: createDefaultScreenNavigationConsumer(actionExecutioner, screen as ParentScreen<TChildren>, ...setters),
    }));
  }
}
