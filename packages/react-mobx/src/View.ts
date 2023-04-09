import type { ViewBase } from "@vmmv/view-bank";
import type { Registrable } from "@vmmv/common";

export type View<TViewModel extends Registrable> = ViewBase<TViewModel, JSX.Element>;
