import type { ScreenDescriptor } from "./ScreenDescriptor";

export interface ParentScreen<TChildren extends ScreenDescriptor> extends ScreenDescriptor {
  child: TChildren | null;
}
