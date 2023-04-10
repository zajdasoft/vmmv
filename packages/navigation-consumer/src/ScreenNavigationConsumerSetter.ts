import type { ScreenDescriptor, ScreenNavigationContext } from "@vmmv/screen"

export type ScreenNavigationConsumerSetter<TScreen extends ScreenDescriptor> = (screen: TScreen, ctx: ScreenNavigationContext) => void;
