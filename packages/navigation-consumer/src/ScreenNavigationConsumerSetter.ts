import type { ScreenBase, ScreenNavigationContext } from "@vmmv/screen"

export type ScreenNavigationConsumerSetter = (screen: ScreenBase, ctx: ScreenNavigationContext) => void;
