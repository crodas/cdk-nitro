import type { OutputDataCreator as OutputDataCreatorSpec } from './specs/OutputDataCreator.nitro';
import { CdkOutputDataCreator } from './CdkOutputDataCreator';
/** The raw native HybridObject (flat results, no cashu-ts types). */
export declare const OutputDataCreator: OutputDataCreatorSpec;
/**
 * A cashu-ts-compatible OutputDataCreator backed by the native module. Inject
 * this into any code expecting a cashu-ts `OutputDataCreator`.
 */
export declare const cashuOutputDataCreator: CdkOutputDataCreator;
//# sourceMappingURL=native.d.ts.map