"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cashuOutputDataCreator = exports.OutputDataCreator = void 0;
var _reactNativeNitroModules = require("react-native-nitro-modules");
var _CdkOutputDataCreator = require("./CdkOutputDataCreator");
/**
 * React Native entry point. Importing this module instantiates the native Nitro
 * HybridObject, so it must only be loaded inside a React Native runtime with
 * `react-native-nitro-modules` present. Non-RN consumers (Node/Bun/Vitest
 * typecheck and tests) should import the pure adapter and types from the package
 * root instead, which pulls in no native code.
 */

/** The raw native HybridObject (flat results, no cashu-ts types). */
const OutputDataCreator = exports.OutputDataCreator = _reactNativeNitroModules.NitroModules.createHybridObject('OutputDataCreator');

/**
 * A cashu-ts-compatible OutputDataCreator backed by the native module. Inject
 * this into any code expecting a cashu-ts `OutputDataCreator`.
 */
const cashuOutputDataCreator = exports.cashuOutputDataCreator = new _CdkOutputDataCreator.CdkOutputDataCreator(OutputDataCreator);
//# sourceMappingURL=native.js.map