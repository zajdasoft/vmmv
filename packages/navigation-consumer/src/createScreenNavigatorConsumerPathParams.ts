import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";
import type { IScreen } from "@vmmv/screen";

export type ParamsSetter<TScreen extends IScreen<TQueryParams>, TQueryParams> = (screen: TScreen, value: string) => void;
export type ParamsSetterCollection<TScreen extends IScreen<TQueryParams>, TQueryParams> = Record<string, ParamsSetter<TScreen, TQueryParams> | {
  setter: ParamsSetter<TScreen, TQueryParams>;
  default: string;
}>

export const createScreenNavigatorConsumerPathParams = <
  TScreen extends IScreen<TQueryParams>,
  TQueryParams,
>(setters: ParamsSetterCollection<TScreen, TQueryParams>): ScreenNavigationConsumerSetter<TScreen, TQueryParams> => (screen, ctx) => {
  const params = ctx.getPathParams();
  Object.keys(setters).forEach(key => {
    const setter = setters[key];
    const callee = typeof setter === "function" ? setter : setter.setter;
    let value: string | undefined = typeof setter === "function" ? undefined : setter.default;

    if (params[key]) value = params[key];
    if (typeof value === "undefined") throw Error(`Path param ${key} for ${screen.constructor.name} was not provided.`);

    callee(screen, value);
  });
}
