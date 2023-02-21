export type Constructor<T = unknown> = new (...args: any[]) => T;
export type Registrable = object;

export type Action<A = void, F = void> = A extends Array<unknown> ? (...params: A) => F : () => F;
export type AsyncAction<A = void, F = void> = Action<A, Promise<F>>;

type TypeKeys<T, K> = { [k in keyof T]: T[k] extends K ? k : never}[keyof T];
export type OnlyOfType<T, K> = { [k in TypeKeys<T, K>]: K };
export type OnlyProperty<T, K> = keyof OnlyOfType<T, K> & string;

export type ActionExecutioner = (name: string, action: Action) => void;
