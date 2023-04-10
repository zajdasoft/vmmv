import { AbstractScreen } from "./AbstractScreen";
import { createDefaultFinalScreenNavigationProvider } from "@vmmv/navigation-provider";
import { createDefaultScreenNavigationConsumer } from "@vmmv/navigation-consumer";
import type { ScreenNavigationConsumerSetter } from "@vmmv/navigation-consumer/src";
import { actionExecutioner } from "./actionExecutioner";

export abstract class FinalScreen extends AbstractScreen {
  abstract get pathname(): () => string;

  protected constructor(...setters: ScreenNavigationConsumerSetter<FinalScreen>[]) {
    super(screen => ({
      provider: createDefaultFinalScreenNavigationProvider(actionExecutioner, screen, () => (screen as FinalScreen).pathname()),
      consumer: createDefaultScreenNavigationConsumer(actionExecutioner, screen as FinalScreen, ...setters),
    }));
  }
}
