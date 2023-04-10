import { createViewBankDecorators, ViewBank } from "@vmmv/view-bank";
import { InvisibleView } from "./InvisibleView";

export const defaultViewBank = new ViewBank();

const { AddDefaultView, AddInvisibleView, AddConditionalView } = createViewBankDecorators(defaultViewBank, InvisibleView);
export { AddDefaultView, AddInvisibleView, AddConditionalView };