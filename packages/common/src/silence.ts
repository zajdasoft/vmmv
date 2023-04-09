import type { AsyncAction } from "./index";

export type SilenceErrorHandler = (err: unknown) => void;

export const silence = (promise: Promise<unknown>, errorHandler?: SilenceErrorHandler) => {
  promise.catch(err => {
    if (errorHandler) {
      errorHandler(err)
    } else {
      console.error(err);
    }
  });
}

export const makeSilent = <TParams extends unknown[]>(action: AsyncAction<TParams, unknown>, errorHandler?: SilenceErrorHandler) => {
  return (...args: TParams) => silence(action(...args), errorHandler);
}
