"use strict";

/**
 * Package root. This entry is free of native (Nitro) code, so it is safe to
 * import in any environment, including Node/Bun/Vitest, for typechecking and
 * tests. To use the native-backed singleton on a device, import from
 * `@cashudevkit/react-native/native`.
 */
import { CdkOutputDataCreator } from "./CdkOutputDataCreator.js";
export { CdkOutputDataCreator } from "./CdkOutputDataCreator.js";
/**
 * Wrap a native OutputDataCreator (the Nitro HybridObject from
 * `@cashudevkit/react-native/native`, or a compatible stand-in for tests) in the
 * cashu-ts-compatible adapter.
 */
export function createCashuOutputDataCreator(native) {
  return new CdkOutputDataCreator(native);
}
//# sourceMappingURL=index.js.map