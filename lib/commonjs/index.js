"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CdkOutputDataCreator", {
  enumerable: true,
  get: function () {
    return _CdkOutputDataCreator.CdkOutputDataCreator;
  }
});
exports.createCashuOutputDataCreator = createCashuOutputDataCreator;
var _CdkOutputDataCreator = require("./CdkOutputDataCreator");
/**
 * Package root. This entry is free of native (Nitro) code, so it is safe to
 * import in any environment, including Node/Bun/Vitest, for typechecking and
 * tests. To use the native-backed singleton on a device, import from
 * `@cashudevkit/react-native/native`.
 */

/**
 * Wrap a native OutputDataCreator (the Nitro HybridObject from
 * `@cashudevkit/react-native/native`, or a compatible stand-in for tests) in the
 * cashu-ts-compatible adapter.
 */
function createCashuOutputDataCreator(native) {
  return new _CdkOutputDataCreator.CdkOutputDataCreator(native);
}
//# sourceMappingURL=index.js.map