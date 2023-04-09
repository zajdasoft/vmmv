import type { ScreenNavigationConsumerSetter } from "./ScreenNavigationConsumerSetter";
import type { ScreenBase } from "@vmmv/screen";

export type ParamsSetter<TScreen extends ScreenBase> = (screen: TScreen, value: string) => void;
export type ParamsSetterCollection<TScreen extends ScreenBase> = Record<string, ParamsSetter<TScreen> | {
  setter: ParamsSetter<TScreen>;
  default: string;
}>

export const createScreenNavigatorConsumerPathParams = <
  TScreen extends ScreenBase,
  TQueryParams,
>(setters: ParamsSetterCollection<TScreen>): ScreenNavigationConsumerSetter<TScreen, TQueryParams> => (screen, ctx) => {
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
