/**
 * Forces a type to be immutable.
 */
export type Immutable<T> = {
    readonly [K in keyof T]: Immutable<T[K]>
}