import type { ScreenBase } from "./ScreenBase";

export interface ParentScreen<TChildren extends ScreenBase> extends ScreenBase {
  child: TChildren | null;
}
