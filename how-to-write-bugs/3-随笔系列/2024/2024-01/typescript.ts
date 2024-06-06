declare function pick<
  T extends Record<string, unknown>,
  Keys extends keyof T
>(target: T, ...keys: Keys[]): {
  [K in Keys]: T[K]
}