/**
 * cashu-ts-compatible adapter over the native Nitro OutputDataCreator.
 *
 * Wraps the native (CDK Rust) blinding results in cashu-ts `OutputData`
 * instances so the module can be injected wherever cashu-ts expects an
 * `OutputDataCreator`, such as Coco's `outputDataCreator` seam. The native
 * crypto is reused verbatim; this layer only converts types across the
 * boundary.
 */
import { OutputData } from '@cashu/cashu-ts';
import type { AmountLike, HasKeysetKeys, OutputDataCreator, P2PKOptions } from '@cashu/cashu-ts';
import type { KeyEntry, OutputData as NativeOutputData, P2PKOptions as NativeP2PKOptions } from './specs/OutputDataCreator.nitro';
/**
 * The subset of the native Nitro OutputDataCreator this adapter drives. Kept
 * structural so a stand-in can be injected in tests.
 */
export interface NativeOutputDataCreator {
    createSingleRandomData(amount: number, keysetId: string): NativeOutputData;
    createRandomData(amount: number, keysetId: string, keys: KeyEntry[], customSplit?: number[]): NativeOutputData[];
    createSingleP2PKData(p2pk: NativeP2PKOptions, amount: number, keysetId: string): NativeOutputData;
    createP2PKData(p2pk: NativeP2PKOptions, amount: number, keysetId: string, keys: KeyEntry[], customSplit?: number[]): NativeOutputData[];
    createSingleDeterministicData(amount: number, seed: ArrayBuffer, counter: number, keysetId: string): NativeOutputData;
    createDeterministicData(amount: number, seed: ArrayBuffer, counter: number, keysetId: string, keys: KeyEntry[], customSplit?: number[]): NativeOutputData[];
}
/**
 * cashu-ts-compatible OutputDataCreator backed by the native CDK Rust crypto.
 * Construct it with the native HybridObject (or a compatible stand-in) and use
 * it anywhere cashu-ts expects an OutputDataCreator.
 */
export declare class CdkOutputDataCreator implements OutputDataCreator {
    private readonly native;
    constructor(native: NativeOutputDataCreator);
    createRandomData(amount: AmountLike, keyset: HasKeysetKeys, customSplit?: AmountLike[]): OutputData[];
    createSingleRandomData(amount: AmountLike, keysetId: string): OutputData;
    createP2PKData(p2pk: P2PKOptions, amount: AmountLike, keyset: HasKeysetKeys, customSplit?: AmountLike[]): OutputData[];
    createSingleP2PKData(p2pk: P2PKOptions, amount: AmountLike, keysetId: string): OutputData;
    createDeterministicData(amount: AmountLike, seed: Uint8Array, counter: number, keyset: HasKeysetKeys, customSplit?: AmountLike[]): OutputData[];
    createSingleDeterministicData(amount: AmountLike, seed: Uint8Array, counter: number, keysetId: string): OutputData;
}
//# sourceMappingURL=CdkOutputDataCreator.d.ts.map